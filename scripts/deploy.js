const hre = require("hardhat")

const { ethers } = hre;

const main = async () => {
  const [owner] = await ethers.getSigners();
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({value: ethers.utils.parseEther("0.1")});
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);

  console.log("Contract balance: ", ethers.utils.formatEther(contractBalance));

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();