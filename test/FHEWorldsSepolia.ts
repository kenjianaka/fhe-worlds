import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm, deployments } from "hardhat";
import { FhevmType } from "@fhevm/hardhat-plugin";
import { FHEWorlds } from "../types";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("FHEWorldsSepolia", function () {
  let contractAddress: string;
  let contract: FHEWorlds;
  let signers: Signers;
  let step = 0;
  let steps = 0;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn("This test suite runs only against Sepolia");
      this.skip();
    }

    try {
      const deployment = await deployments.get("FHEWorlds");
      contractAddress = deployment.address;
      contract = (await ethers.getContractAt("FHEWorlds", deployment.address)) as FHEWorlds;
    } catch (e) {
      (e as Error).message += ". Deploy the contract with 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const availableSigners = await ethers.getSigners();
    signers = { alice: availableSigners[0] };
  });

  beforeEach(async function () {
    step = 0;
    steps = 0;
  });

  it("allows country selection and salary claim on Sepolia", async function () {
    this.timeout(4 * 40000);
    steps = 9;

    progress("Encrypting country id 1...");
    const encryptedCountry = await fhevm
      .createEncryptedInput(contractAddress, signers.alice.address)
      .add32(1)
      .encrypt();

    progress("Submitting joinCountry transaction...");
    const joinTx = await contract
      .connect(signers.alice)
      .joinCountry(1, encryptedCountry.handles[0], encryptedCountry.inputProof);
    await joinTx.wait();

    progress("Fetching stored country cipher...");
    const countryCipher = await contract.getEncryptedCountry(signers.alice.address);
    expect(countryCipher).to.not.equal(ethers.ZeroHash);

    progress("Decrypting stored country...");
    const clearCountry = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      countryCipher,
      contractAddress,
      signers.alice,
    );
    expect(clearCountry).to.equal(1);

    progress("Claiming salary...");
    const salaryCipher = await contract.connect(signers.alice).claimSalary();

    progress("Decrypting salary...");
    const clearSalary = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      salaryCipher,
      contractAddress,
      signers.alice,
    );
    expect(clearSalary).to.not.equal(0);

    progress("Verifying salary cannot be reclaimed...");
    await expect(contract.connect(signers.alice).claimSalary()).to.be.revertedWithCustomError(
      contract,
      "SalaryAlreadyClaimed",
    );
  });
});
