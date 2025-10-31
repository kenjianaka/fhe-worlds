import { useMemo, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { ethers } from 'ethers';

import { Header } from './Header';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { useEthersSigner } from '../hooks/useEthersSigner';
import '../styles/WorldApp.css';

type CountryOption = {
  id: number;
  name: string;
  salary: number;
  description: string;
};

const COUNTRIES: CountryOption[] = [
  {
    id: 1,
    name: 'Aurora Union',
    salary: 5200,
    description: 'Vibrant tech hub with collaborative research programs.',
  },
  {
    id: 2,
    name: 'Harbor Coalition',
    salary: 4800,
    description: 'Maritime trade collective focused on green logistics.',
  },
  {
    id: 3,
    name: 'Skyreach Republic',
    salary: 6100,
    description: 'Aerospace innovation center with performance bonuses.',
  },
  {
    id: 4,
    name: 'Verdant League',
    salary: 4500,
    description: 'Sustainability-first alliance investing in clean energy.',
  },
];

function normalizeHandle(value: unknown): string | undefined {
  if (!value) {
    return undefined;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object' && 'toString' in value && typeof value.toString === 'function') {
    return value.toString();
  }
  return undefined;
}

function formatDollars(value?: number | null) {
  if (value === undefined || value === null) {
    return '***';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function WorldApp() {
  const { address } = useAccount();
  const signer = useEthersSigner();
  const { instance, isLoading: isInstanceLoading, error: instanceError } = useZamaInstance();

  const [joinTarget, setJoinTarget] = useState<number | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isDecryptingCountry, setIsDecryptingCountry] = useState(false);
  const [isDecryptingSalary, setIsDecryptingSalary] = useState(false);
  const [decryptedCountryId, setDecryptedCountryId] = useState<number | null>(null);
  const [decryptedSalary, setDecryptedSalary] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: joinedData,
    refetch: refetchJoined,
    isFetching: isFetchingJoined,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'hasJoined',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const hasJoined = Boolean(joinedData);

  const {
    data: countryCipherData,
    refetch: refetchCountry,
    isFetching: isFetchingCountry,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getEncryptedCountry',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address) && Boolean(joinedData),
    },
  });

  const {
    data: salaryTuple,
    refetch: refetchSalary,
    isFetching: isFetchingSalary,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getEncryptedSalary',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address) && Boolean(joinedData),
    },
  });

  const salaryHandle = useMemo(() => {
    if (!salaryTuple || !Array.isArray(salaryTuple)) {
      return undefined;
    }
    return normalizeHandle(salaryTuple[0]);
  }, [salaryTuple]);

  const salaryClaimed = Boolean(salaryTuple && Array.isArray(salaryTuple) ? salaryTuple[1] : false);
  const countryHandle = normalizeHandle(countryCipherData);

  const selectedCountry = useMemo(() => {
    if (decryptedCountryId === null) {
      return null;
    }
    return COUNTRIES.find((country) => country.id === decryptedCountryId) ?? null;
  }, [decryptedCountryId]);

  const isBusy = joinTarget !== null || isClaiming || isFetchingJoined || isFetchingCountry || isFetchingSalary;

  async function requestDecryption(handles: string[]) {
    if (!instance) {
      throw new Error('Encryption service unavailable');
    }
    const resolvedSigner = await signer;
    if (!resolvedSigner) {
      throw new Error('Wallet not connected');
    }

    const keypair = instance.generateKeypair();
    const handleContractPairs = handles.map((handle) => ({
      handle,
      contractAddress: CONTRACT_ADDRESS,
    }));

    const startTimeStamp = Math.floor(Date.now() / 1000).toString();
    const durationDays = '10';
    const contractAddresses = [CONTRACT_ADDRESS];

    const eip712 = instance.createEIP712(
      keypair.publicKey,
      contractAddresses,
      startTimeStamp,
      durationDays
    );

    const signature = await resolvedSigner.signTypedData(
      eip712.domain,
      {
        UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification,
      },
      eip712.message
    );

    const result = await instance.userDecrypt(
      handleContractPairs,
      keypair.privateKey,
      keypair.publicKey,
      signature.replace('0x', ''),
      contractAddresses,
      resolvedSigner.address,
      startTimeStamp,
      durationDays
    );

    return result as Record<string, string>;
  }

  async function handleJoin(country: CountryOption) {
    if (!address) {
      setErrorMessage('Please connect your wallet before joining a country.');
      return;
    }
    if (!instance) {
      setErrorMessage('Encryption service is still loading. Please try again shortly.');
      return;
    }
    const resolvedSigner = await signer;
    if (!resolvedSigner) {
      setErrorMessage('Wallet signer is unavailable.');
      return;
    }
    try {
      setStatusMessage(null);
      setErrorMessage(null);
      setJoinTarget(country.id);
      setDecryptedCountryId(null);
      setDecryptedSalary(null);

      const encryptedInput = await instance
        .createEncryptedInput(CONTRACT_ADDRESS, resolvedSigner.address)
        .add32(country.id)
        .encrypt();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, resolvedSigner);
      const tx = await contract.joinCountry(country.id, encryptedInput.handles[0], encryptedInput.inputProof);
      await tx.wait();

      await Promise.all([refetchJoined(), refetchCountry(), refetchSalary()]);

      setStatusMessage(`Joined ${country.name}. You can now decrypt your enrollment.`);
      setDecryptedCountryId(country.id);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to join the selected country.'
      );
    } finally {
      setJoinTarget(null);
    }
  }

  async function handleClaim() {
    if (!address) {
      setErrorMessage('Please connect your wallet before claiming salary.');
      return;
    }
    const resolvedSigner = await signer;
    if (!resolvedSigner) {
      setErrorMessage('Wallet signer is unavailable.');
      return;
    }
    try {
      setStatusMessage(null);
      setErrorMessage(null);
      setIsClaiming(true);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, resolvedSigner);
      const tx = await contract.claimSalary();
      await tx.wait();

      await refetchSalary();
      setStatusMessage('Salary claimed successfully. Decrypt to view the confidential amount.');
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to claim salary.');
    } finally {
      setIsClaiming(false);
    }
  }

  async function decryptCountry() {
    if (!countryHandle || countryHandle === ethers.ZeroHash || countryHandle === '0x') {
      setErrorMessage('No encrypted country found for decryption.');
      return;
    }
    try {
      setErrorMessage(null);
      setIsDecryptingCountry(true);

      const result = await requestDecryption([countryHandle]);
      const decryptedValue = result[countryHandle];
      const numericValue = Number(decryptedValue);

      if (Number.isNaN(numericValue)) {
        throw new Error('Unable to parse decrypted country id.');
      }

      setDecryptedCountryId(numericValue);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to decrypt country.');
    } finally {
      setIsDecryptingCountry(false);
    }
  }

  async function decryptSalary() {
    if (!salaryHandle || salaryHandle === ethers.ZeroHash || salaryHandle === '0x') {
      setErrorMessage('No encrypted salary found for decryption.');
      return;
    }
    try {
      setErrorMessage(null);
      setIsDecryptingSalary(true);

      const result = await requestDecryption([salaryHandle]);
      const decryptedValue = result[salaryHandle];
      const numericValue = Number(decryptedValue);

      if (Number.isNaN(numericValue)) {
        throw new Error('Unable to parse decrypted salary.');
      }

      setDecryptedSalary(numericValue);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to decrypt salary.');
    } finally {
      setIsDecryptingSalary(false);
    }
  }

  return (
    <div className="world-app">
      <Header />

      <main className="world-main">
        <section className="world-hero">
          <div>
            <h2 className="world-title">Choose a nation. Keep your data private.</h2>
            <p className="world-subtitle">
              Every country selection and salary is stored with homomorphic encryption. Join the world that matches your ambitions and keep your information confidential.
            </p>
          </div>
          <div className="world-status">
            <span className="status-label">Status</span>
            <span className={`status-pill ${hasJoined ? 'status-joined' : 'status-open'}`}>
              {hasJoined ? 'Joined' : 'Open to join'}
            </span>
          </div>
        </section>

        {statusMessage && <div className="world-banner success">{statusMessage}</div>}
        {errorMessage && <div className="world-banner error">{errorMessage}</div>}
        {instanceError && !instance && (
          <div className="world-banner error">{instanceError}</div>
        )}

        <section className="world-section">
          <header className="section-header">
            <div>
              <h3 className="section-title">Available countries</h3>
              <p className="section-description">
                Pick one nation to unlock its encrypted payroll stream. Each salary is denominated in confidential dollars.
              </p>
            </div>
          </header>

          <div className="country-grid">
            {COUNTRIES.map((country) => {
              const isCurrentSelection = decryptedCountryId === country.id;
              return (
                <article key={country.id} className={`country-card ${isCurrentSelection ? 'country-active' : ''}`}>
                  <div className="country-id">#{country.id}</div>
                  <h4 className="country-name">{country.name}</h4>
                  <p className="country-description">{country.description}</p>
                  <p className="country-salary">
                    Salary: <span>{formatDollars(country.salary)}</span>
                  </p>
                  <button
                    className="country-button"
                    disabled={
                      !address ||
                      hasJoined ||
                      joinTarget === country.id ||
                      isBusy ||
                      isInstanceLoading
                    }
                    onClick={() => handleJoin(country)}
                  >
                    {joinTarget === country.id ? 'Joining...' : hasJoined ? 'Joined' : 'Join with encryption'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="world-section">
          <header className="section-header">
            <div>
              <h3 className="section-title">Your encrypted profile</h3>
              <p className="section-description">
                Decrypt your enrollment when you need to verify it. Only your wallet can unlock the ciphertext.
              </p>
            </div>
          </header>

          {!address ? (
            <div className="empty-state">
              <p>Please connect your wallet to continue.</p>
            </div>
          ) : !hasJoined ? (
            <div className="empty-state">
              <p>You have not joined a country yet. Select one from the list above.</p>
            </div>
          ) : (
            <div className="profile-grid">
              <div className="profile-card">
                <div className="profile-header">
                  <span className="profile-label">Country</span>
                  <button
                    className="profile-action"
                    onClick={decryptCountry}
                    disabled={isDecryptingCountry || isBusy || isInstanceLoading}
                  >
                    {isDecryptingCountry ? 'Decrypting...' : 'Decrypt'}
                  </button>
                </div>
                <p className="profile-value">
                  {selectedCountry ? selectedCountry.name : 'Encrypted selection'}
                </p>
                {selectedCountry && (
                  <p className="profile-hint">Linked salary: {formatDollars(selectedCountry.salary)}</p>
                )}
              </div>

              <div className="profile-card">
                <div className="profile-header">
                  <span className="profile-label">Salary</span>
                  <div className="profile-actions">
                    <button
                      className="profile-action"
                      onClick={decryptSalary}
                      disabled={isDecryptingSalary || isBusy || isInstanceLoading}
                    >
                      {isDecryptingSalary ? 'Decrypting...' : 'Decrypt'}
                    </button>
                    <button
                      className="profile-action primary"
                      onClick={handleClaim}
                      disabled={isClaiming || salaryClaimed || isBusy || isInstanceLoading}
                    >
                      {isClaiming ? 'Claiming...' : salaryClaimed ? 'Claimed' : 'Claim salary'}
                    </button>
                  </div>
                </div>
                <p className="profile-value">
                  {decryptedSalary !== null ? formatDollars(decryptedSalary) : 'Encrypted amount'}
                </p>
                <p className={`profile-hint ${salaryClaimed ? 'profile-hint-success' : ''}`}>
                  {salaryClaimed ? 'Salary already claimed.' : 'Available for a single claim.'}
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
