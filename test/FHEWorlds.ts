import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { FHEWorlds, FHEWorlds__factory } from "../types";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("FHEWorlds")) as FHEWorlds__factory;
  const contract = (await factory.deploy()) as FHEWorlds;
  const address = await contract.getAddress();

  return { contract, address };
}

describe("FHEWorlds", function () {
  let signers: Signers;
  let contract: FHEWorlds;
  let contractAddress: string;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async function () {
    if (!fhevm.isMock) {
      console.warn("FHEWorlds tests require the mock FHEVM environment");
      this.skip();
    }

    ({ contract, address: contractAddress } = await deployFixture());
  });

  it("returns the default country identifiers", async function () {
    const ids = await contract.getSupportedCountryIds();
    expect(ids.map((id) => Number(id))).to.deep.equal([1, 2, 3, 4]);
  });

  it("allows a user to join and decrypt their country and salary", async function () {
    const selectedCountry = 2;

    const encryptedCountry = await fhevm
      .createEncryptedInput(contractAddress, signers.alice.address)
      .add32(selectedCountry)
      .encrypt();

    await contract
      .connect(signers.alice)
      .joinCountry(selectedCountry, encryptedCountry.handles[0], encryptedCountry.inputProof);

    const storedCountry = await contract.getEncryptedCountry(signers.alice.address);
    const clearCountry = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      storedCountry,
      contractAddress,
      signers.alice,
    );
    expect(clearCountry).to.equal(selectedCountry);

    const storedSalary = await contract.getEncryptedSalary(signers.alice.address);
    const clearSalary = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      storedSalary[0],
      contractAddress,
      signers.alice,
    );
    expect(clearSalary).to.equal(4800);
    expect(storedSalary[1]).to.equal(false);
  });

  it("allows claiming salary exactly once", async function () {
    const selectedCountry = 3;
    const encryptedCountry = await fhevm
      .createEncryptedInput(contractAddress, signers.bob.address)
      .add32(selectedCountry)
      .encrypt();

    await contract
      .connect(signers.bob)
      .joinCountry(selectedCountry, encryptedCountry.handles[0], encryptedCountry.inputProof);

    await contract.connect(signers.bob).claimSalary();
    const [salaryCipher] = await contract.getEncryptedSalary(signers.bob.address);
    const clearSalary = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      salaryCipher,
      contractAddress,
      signers.bob,
    );
    expect(clearSalary).to.equal(6100);

    await expect(contract.connect(signers.bob).claimSalary()).to.be.revertedWithCustomError(
      contract,
      "SalaryAlreadyClaimed",
    );
  });

  it("prevents duplicate joins and unsupported countries", async function () {
    const encryptedCountry = await fhevm
      .createEncryptedInput(contractAddress, signers.alice.address)
      .add32(1)
      .encrypt();

    await contract
      .connect(signers.alice)
      .joinCountry(1, encryptedCountry.handles[0], encryptedCountry.inputProof);

    await expect(
      contract.connect(signers.alice).joinCountry(1, encryptedCountry.handles[0], encryptedCountry.inputProof),
    ).to.be.revertedWithCustomError(contract, "AlreadyJoined");

    const encryptedInvalidCountry = await fhevm
      .createEncryptedInput(contractAddress, signers.bob.address)
      .add32(9)
      .encrypt();

    await expect(
      contract.connect(signers.bob).joinCountry(9, encryptedInvalidCountry.handles[0], encryptedInvalidCountry.inputProof),
    ).to.be.revertedWithCustomError(contract, "UnsupportedCountry");
  });
});
