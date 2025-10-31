import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedContract = await deploy("FHEWorlds", {
    from: deployer,
    log: true,
  });

  console.log(`FHEWorlds contract: `, deployedContract.address);
};
export default func;
func.id = "deploy_fheWorlds"; // id required to prevent reexecution
func.tags = ["FHEWorlds"];
