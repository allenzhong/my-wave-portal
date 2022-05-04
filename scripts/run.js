const hre = require("hardhat")

const { ethers } = hre;

const main = async () => {
  const [owner, p1, p2, p3 ] = await ethers.getSigners();
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  let waveCount; 
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(p1).wave();
  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(p2).wave();
  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(p3).wave();
  waveCount = await waveContract.getTotalWaves();
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