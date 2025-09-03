const { assert } = require("chai");
const config = require("../truffle-config");
const Web3 = require("web3");
const web3 = new Web3(
  `ws://${config.networks.development.host}:${config.networks.development.port}`
);

const BN = web3.utils.BN;
const getInt = (bn) => BN(bn).toString();

const MintoriaRandomizer = artifacts.require("MintoriaRandomizer");
const MintoriaStore = artifacts.require("MintoriaStore");
const MintoriaMain = artifacts.require("MintoriaMain");

require("chai").use(require("chai-as-promised")).should();

let insertedProjectId;

contract("MintoriaMain", (accounts) => {
  let coreContract;
  let randContract;
  let mainContract;
  const artist = accounts[1];
  const operator = accounts[2];

  const FEE_PERCENTAGE = 10;
  const PRICE_PER_TOKEN = "1000000000000000000";
  const ARTIST_FUNDS = new BN(PRICE_PER_TOKEN)
    .mul(new BN(100 - FEE_PERCENTAGE))
    .div(new BN(100));

  const TOTAL_FEES = new BN(PRICE_PER_TOKEN)
    .mul(new BN(FEE_PERCENTAGE))
    .div(new BN(100));

  before(async () => {
    randContract = await MintoriaRandomizer.deployed();
    coreContract = await MintoriaStore.deployed();
    mainContract = await MintoriaMain.deployed();

    await coreContract.addOperatingRights(operator);
    await coreContract.addMintRights(mainContract.address);
    // setup projects
    insertedProjectId = (await coreContract.nextProjectId()).toString();
    await coreContract.createProject(
      artist,
      "active project",
      PRICE_PER_TOKEN,
      FEE_PERCENTAGE,
      false,
      {
        from: operator,
      }
    );
    await coreContract.toggleActiveProject(insertedProjectId, {
      from: operator,
    });
    await coreContract.togglePausedProject(insertedProjectId, {
      from: operator,
    });

    const maxIterations = 10;
    await coreContract.setProjectMaxIterations(
      insertedProjectId,
      maxIterations,
      {
        from: operator,
      }
    );
    const maxTokensPerAddress = 5;
    await coreContract.setProjectMaxTokensPerAddress(
      insertedProjectId,
      maxTokensPerAddress,
      {
        from: operator,
      }
    );
    const price = "1000000000000000000";
    await coreContract.setProjectPricePerTokenInWei(insertedProjectId, price, {
      from: operator,
    });
  });

  describe("Deployment", async () => {
    it("deploys", async () => {
      const address = mainContract.address;
      assert.notEqual(address, undefined);
      assert.notEqual(address, null);
      assert.notEqual(address, "");
      assert.notEqual(address, 0x0);
    });

    it("has a core contract", async () => {
      const core = await mainContract.mintoriaStoreContract();
      assert.equal(core, coreContract.address);
    });
  });

  describe("Purchasing", async () => {
    it("purchases and sends funds", async () => {
      const mintoriaAddress = accounts[9];
      await coreContract.setMintoriaAddress(mintoriaAddress, {
        from: accounts[0],
      });
      const mintoriaFeeSplitPercentage =
        await coreContract.mintoriaFeeSplitPercentage();
      const mintoriaBalancePre = await web3.eth.getBalance(mintoriaAddress);

      const adminAddress = accounts[0];
      const adminFeeSplitPercentage =
        await coreContract.adminFeeSplitPercentage();
      const adminBalancePre = await web3.eth.getBalance(adminAddress);

      const artistBalancePre = await web3.eth.getBalance(artist);
      const details = await coreContract.getProjectTokenDetails(
        insertedProjectId
      );

      const price = getInt(details.pricePerTokenInWei);
      const pricePerTokenInWei = details.pricePerTokenInWei;

      const projectFeePercentage = details.feePercentage;
      await mainContract.purchase(insertedProjectId, {
        from: accounts[5],
        value: price,
      });
      /** ----- checks ----- */
      const artistBalancePost = await web3.eth.getBalance(artist);
      const mintoriaBalancePost = await web3.eth.getBalance(mintoriaAddress);
      const adminBalancePost = await web3.eth.getBalance(adminAddress);

      const artistFunds = new BN(pricePerTokenInWei)
        .mul(new BN(100).sub(projectFeePercentage))
        .div(new BN(100));
      const totalFees = new BN(pricePerTokenInWei)
        .mul(projectFeePercentage)
        .div(new BN(100));
      const projectFunds = pricePerTokenInWei.sub(totalFees);

      const mintoriaFunds = totalFees
        .mul(mintoriaFeeSplitPercentage)
        .div(new BN(100));

      const adminFunds = totalFees
        .mul(adminFeeSplitPercentage)
        .div(new BN(100));

      assert.equal(getInt(ARTIST_FUNDS), getInt(artistFunds));
      assert.equal(getInt(TOTAL_FEES), getInt(totalFees));
      assert.equal(
        getInt(new BN(artistBalancePre)),
        getInt(new BN(artistBalancePost).sub(projectFunds))
      );
      assert.equal(
        getInt(new BN(mintoriaBalancePre)),
        getInt(new BN(mintoriaBalancePost).sub(mintoriaFunds))
      );
      assert.equal(
        getInt(new BN(adminBalancePre)),
        getInt(new BN(adminBalancePost).sub(adminFunds))
      );
    });
  });
});
