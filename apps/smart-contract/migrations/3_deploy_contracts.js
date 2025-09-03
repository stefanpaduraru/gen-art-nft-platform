const MintoriaRandomizer = artifacts.require("MintoriaRandomizer");
const MintoriaStore = artifacts.require("MintoriaStore");
const MintoriaMain = artifacts.require("MintoriaMain");

module.exports = async function (deployer, network, accounts) {
  // ---- rand ----
  await deployer.deploy(MintoriaRandomizer, {
    gas: 2000000000000,
    from: accounts[0],
  });
  const rand = await MintoriaRandomizer.deployed();
  const randAddress = rand.address;
  console.log("Randomizer Address", randAddress);

  // ---- store ----
  await deployer.deploy(
    MintoriaStore,
    "Mintoria",
    "MTR",
    accounts[0],
    randAddress,
    {
      gas: 2000000000000,
      from: accounts[0],
    }
  );
  const core = await MintoriaStore.deployed();
  const coreAddress = core.address;
  console.log("Store Address", coreAddress);

  // ---- main ----
  await deployer.deploy(MintoriaMain, coreAddress, {
    gas: 2000000000000,
    from: accounts[0],
  });
  const main = await MintoriaMain.deployed();
  const mainAddress = main.address;
  console.log("Main Address", mainAddress);
};
