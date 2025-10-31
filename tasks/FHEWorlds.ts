import { FhevmType } from "@fhevm/hardhat-plugin";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:address", "Prints the FHEWorlds address").setAction(async function (_: TaskArguments, hre) {
  const deployment = await hre.deployments.get("FHEWorlds");
  console.log("FHEWorlds address is " + deployment.address);
});

task("task:countries", "Lists configured country identifiers").setAction(async function (_: TaskArguments, hre) {
  const deployment = await hre.deployments.get("FHEWorlds");
  const contract = await hre.ethers.getContractAt("FHEWorlds", deployment.address);
  const ids = await contract.getSupportedCountryIds();
  console.log("Supported country ids:", ids.map((id: bigint) => Number(id)));
});

task("task:join-country", "Encrypts and submits a country selection")
  .addParam("countryId", "Plain country id")
  .addOptionalParam("address", "Override contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { deployments, ethers, fhevm } = hre;
    const target = taskArguments.address ? { address: taskArguments.address } : await deployments.get("FHEWorlds");
    const countryId = Number(taskArguments.countryId);
    if (!Number.isInteger(countryId)) {
      throw new Error("countryId must be an integer");
    }

    await fhevm.initializeCLIApi();

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FHEWorlds", target.address);

    const encryptedInput = await fhevm.createEncryptedInput(target.address, signer.address).add32(countryId).encrypt();

    const tx = await contract
      .connect(signer)
      .joinCountry(countryId, encryptedInput.handles[0], encryptedInput.inputProof);
    console.log(`joinCountry tx=${tx.hash}`);
    await tx.wait();

    console.log(`Country ${countryId} joined successfully`);
  });

task("task:decrypt-country", "Decrypts the stored country for the first signer")
  .addOptionalParam("address", "Override contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { deployments, ethers, fhevm } = hre;
    const target = taskArguments.address ? { address: taskArguments.address } : await deployments.get("FHEWorlds");

    await fhevm.initializeCLIApi();

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FHEWorlds", target.address);
    const cipher = await contract.getEncryptedCountry(signer.address);

    if (cipher === ethers.ZeroHash) {
      console.log("No country stored");
      return;
    }

    const decrypted = await fhevm.userDecryptEuint(FhevmType.euint32, cipher, target.address, signer);
    console.log(`Encrypted country: ${cipher}`);
    console.log(`Decrypted country id: ${decrypted}`);
  });

task("task:claim-salary", "Claims the encrypted salary for the first signer")
  .addOptionalParam("address", "Override contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { deployments, ethers } = hre;
    const target = taskArguments.address ? { address: taskArguments.address } : await deployments.get("FHEWorlds");

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FHEWorlds", target.address);
    const tx = await contract.connect(signer).claimSalary();
    console.log(`claimSalary tx=${tx.hash}`);
    await tx.wait();

    console.log("Salary claimed.");
  });

task("task:decrypt-salary", "Decrypts the stored salary for the first signer")
  .addOptionalParam("address", "Override contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { deployments, ethers, fhevm } = hre;
    const target = taskArguments.address ? { address: taskArguments.address } : await deployments.get("FHEWorlds");

    await fhevm.initializeCLIApi();

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("FHEWorlds", target.address);
    const [salaryCipher] = await contract.getEncryptedSalary(signer.address);
    if (salaryCipher === ethers.ZeroHash) {
      console.log("No salary stored");
      return;
    }

    const decrypted = await fhevm.userDecryptEuint(FhevmType.euint32, salaryCipher, target.address, signer);
    console.log(`Encrypted salary: ${salaryCipher}`);
    console.log(`Decrypted salary: ${decrypted} dollars`);
  });
