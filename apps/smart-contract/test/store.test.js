const { assert } = require("chai");
const config = require("../truffle-config");
const Web3 = require("web3");
const web3 = new Web3(
  `ws://${config.networks.development.host}:${config.networks.development.port}`
);

const BN = web3.utils.BN;
const isHex = web3.utils.isHex;
const hexToUtf8 = web3.utils.hexToUtf8;
const hexToAscii = web3.utils.hexToAscii;
const hexToBytes = web3.utils.hexToBytes;
const getInt = (bn) => BN(bn).toString();

const MintoriaRandomizer = artifacts.require("MintoriaRandomizer");
const MintoriaStore = artifacts.require("MintoriaStore");
const MintoriaMain = artifacts.require("MintoriaMain");

const DEFAULT_ADMIN_PERCENTAGE = 80;
const DEFAULT_MINTORIA_PERCENTAGE = 20;
const DEFAULT_NEXT_PROJECT_ID = 1;
const PRICE_PER_TOKEN = "10000000000";

require("chai").use(require("chai-as-promised")).should();

const adminOnly = (error) => {
  assert.include(error.message, "Ownable: caller is not the owner");
};

const operatorsOnly = (error) => {
  assert.include(error.message, "Not an operator");
};

const mintersOnly = (error) => {
  assert.include(error.message, "Not a minter");
};

const operatorsOrArtistOnly = (error) => {
  assert.include(error.message, "Not artist or an operator");
};

const mintoriaOnly = (error) => {
  assert.include(error.message, "Not Mintoria");
};

const validTokenOnly = (error) => {
  assert.include(error.message, "Non-existent token");
};

const projectIsLocked = (error) => {
  assert.include(error.message, "Project is locked");
};

const projectIsInactive = (error) => {
  assert.include(error.message, "Project is inactive");
};

const projectIsPaused = (error) => {
  assert.include(error.message, "Project is paused");
};

const maxIs100Percent = (error) => {
  assert.include(error.message, "Max is 100%");
};

const maxIs100K = (error) => {
  assert.include(error.message, "Max is 100,000");
};

const mintingMaxTokensByAddress = (error) => {
  assert.include(error.message, "Cannot mint more than max tokens per address");
};

const mintingMaxIterations = (error) => {
  assert.include(error.message, "Cannot mint more than project max iterations");
};

const cannotExceed100Percent = (error) => {
  assert.include(error.message, "Cannot exceed 100%");
};

let insertedProjectId;
let inactiveProjectId;
let lockedProjectId;
let pausedProjectId;

contract("MintoriaStore", (accounts) => {
  let coreContract;
  let randContract;
  let mainContract;
  const admin = accounts[0];
  const artist = accounts[1];
  const operator = accounts[2];
  const minter = accounts[3];
  const mintoriaAddress = accounts[0];

  before(async () => {
    randContract = await MintoriaRandomizer.deployed();
    coreContract = await MintoriaStore.deployed();
    mainContract = await MintoriaMain.deployed();
  });

  describe("Deployment", async () => {
    it("core: deploys", async () => {
      const address = coreContract.address;
      assert.notEqual(address, undefined);
      assert.notEqual(address, null);
      assert.notEqual(address, "");
      assert.notEqual(address, 0x0);
    });

    it("core: has a name", async () => {
      const name = await coreContract.name();
      assert.equal(name, "Mintoria");
    });

    it("core: has a symbol", async () => {
      const symbol = await coreContract.symbol();
      assert.equal(symbol, "MTR");
    });

    it("core: has a randomizer contract", async () => {
      const rand = await coreContract.mintoriaRandomizerContract();
      assert.equal(rand, randContract.address);
    });
  });

  describe("Settings", async () => {
    it("has admin address", async () => {
      const adminAddress = await coreContract.owner();
      assert.equal(adminAddress, admin);
    });

    it("has Mintoria address", async () => {
      const address = await coreContract.mintoriaAddress();
      assert.equal(address, mintoriaAddress);
    });

    it("has admin fee split percentage", async () => {
      const number = await coreContract.adminFeeSplitPercentage();
      assert.equal(number, DEFAULT_ADMIN_PERCENTAGE);
    });

    it("has Mintoria percentage", async () => {
      const number = await coreContract.mintoriaFeeSplitPercentage();
      assert.equal(number, DEFAULT_MINTORIA_PERCENTAGE);
    });

    it("has next project id", async () => {
      const number = await coreContract.nextProjectId();
      assert.equal(number, DEFAULT_NEXT_PROJECT_ID);
    });

    it("has total supply null", async () => {
      const number = await coreContract.totalSupply();
      assert.equal(number, 0);
    });

    it("has admin as operator", async () => {
      const isOperator = await coreContract.operators(admin);
      assert.equal(isOperator, true);
    });

    it("has admin as minter", async () => {
      const isMinter = await coreContract.minters(admin);
      assert.equal(isMinter, true);
    });
  });

  describe("Addresses", async () => {
    it("Mintoria: update success for Mintoria", async () => {
      let newAddress = accounts[9];
      await coreContract.setMintoriaAddress(newAddress, {
        from: admin,
      });

      let details = await coreContract.mintoriaAddress();
      assert.equal(details, newAddress);

      // reverting to admin
      newAddress = admin;
      await coreContract.setMintoriaAddress(newAddress, {
        from: accounts[9],
      });

      details = await coreContract.mintoriaAddress();
      assert.equal(details, newAddress);
    });

    it("Mintoria: update fails for non-Mintoria", async () => {
      coreContract
        .setMintoriaAddress(accounts[9], {
          from: accounts[9],
        })
        .then(assert.fail)
        .catch(mintoriaOnly);
    });

    it("Randomizer: update success for operator", async () => {
      let newAddress = accounts[9];
      await coreContract.setRandomizerAddress(newAddress, {
        from: admin,
      });

      let details = await coreContract.mintoriaRandomizerContract();
      assert.equal(details, newAddress);

      // reverting to initial
      newAddress = randContract.address;
      await coreContract.setRandomizerAddress(newAddress, {
        from: admin,
      });

      details = await coreContract.mintoriaRandomizerContract();
      assert.equal(details, newAddress);
    });

    it("Randomizer: update fails for non-operator", async () => {
      coreContract
        .setRandomizerAddress(accounts[9], {
          from: accounts[9],
        })
        .then(assert.fail)
        .catch(operatorsOnly);
    });
  });

  describe("Percentages", async () => {
    it("Mintoria: update success for Mintoria", async () => {
      let newPercentage = 0;
      await coreContract.setMintoriaFeeSplitPercentage(newPercentage, {
        from: admin,
      });

      let details = await coreContract.mintoriaFeeSplitPercentage();
      assert.equal(details, newPercentage);
    });

    it("Mintoria: update fails for non-Mintoria", async () => {
      let newPercentage = 25;
      coreContract
        .setMintoriaFeeSplitPercentage(newPercentage, {
          from: accounts[9],
        })
        .then(assert.fail)
        .catch(mintoriaOnly);
    });

    it("Mintoria: update fails for >100%", async () => {
      let newPercentage = 101;
      coreContract
        .setMintoriaFeeSplitPercentage(newPercentage, {
          from: admin,
        })
        .then(assert.fail)
        .catch(maxIs100Percent);
    });

    it("admin: update success for admin", async () => {
      let newPercentage = "100";
      await coreContract.setAdminFeeSplitPercentage(newPercentage, {
        from: admin,
      });

      let details = await coreContract.adminFeeSplitPercentage();
      assert.equal(details.toString(), newPercentage);
    });

    it("admin: update fails for operator", async () => {
      let newPercentage = 25;
      coreContract
        .setAdminFeeSplitPercentage(newPercentage, {
          from: operator,
        })
        .then(assert.fail)
        .catch(adminOnly);
    });

    it("admin: update fails for non-admin", async () => {
      let newPercentage = 25;
      coreContract
        .setAdminFeeSplitPercentage(newPercentage, {
          from: accounts[9],
        })
        .then(assert.fail)
        .catch(adminOnly);
    });

    it("admin: update fails for >100%", async () => {
      let newPercentage = 101;
      coreContract
        .setAdminFeeSplitPercentage(newPercentage, {
          from: admin,
        })
        .then(assert.fail)
        .catch(maxIs100Percent);
    });
  });

  describe("Roles", async () => {
    it("not operator", async () => {
      const isOperator = await coreContract.operators(accounts[5]);
      assert.equal(isOperator, false);
    });

    it("not minter", async () => {
      const isMinter = await coreContract.minters(accounts[5]);
      assert.equal(isMinter, false);
    });

    it("operator: adds rights", async () => {
      await coreContract.addOperatingRights(operator);
      await coreContract.addOperatingRights(accounts[6]);
      await coreContract.addOperatingRights(accounts[7]);
      await coreContract.addOperatingRights(accounts[8]);

      let isOperator = await coreContract.operators(accounts[6]);
      assert.equal(isOperator, true);
      isOperator = await coreContract.operators(accounts[7]);
      assert.equal(isOperator, true);
      isOperator = await coreContract.operators(accounts[8]);
      assert.equal(isOperator, true);
    });

    it("operator: removes rights", async () => {
      await coreContract.removeOperatingRights(accounts[6]);
      await coreContract.removeOperatingRights(accounts[7]);
      await coreContract.removeOperatingRights(accounts[8]);

      let isOperator = await coreContract.operators(accounts[6]);
      assert.equal(isOperator, false);
      isOperator = await coreContract.operators(accounts[7]);
      assert.equal(isOperator, false);
      isOperator = await coreContract.operators(accounts[8]);
      assert.equal(isOperator, false);
    });

    it("minter: adds rights", async () => {
      await coreContract.addMintRights(minter);
      await coreContract.addMintRights(accounts[6]);
      const isMinter = await coreContract.minters(accounts[6]);
      assert.equal(isMinter, true);
    });

    it("minter: removes rights", async () => {
      await coreContract.removeMintRights(accounts[6]);
      const isMinter = await coreContract.minters(accounts[6]);
      assert.equal(isMinter, false);
    });
  });

  describe("Projects", async () => {
    // create
    const feePercentage = 5;
    it("create: fails for non-operator", async () => {
      return coreContract
        .createProject(
          artist,
          "test-project",
          100000000,
          feePercentage,
          false,
          {
            from: artist,
          }
        )
        .then(assert.fail)
        .catch(operatorsOnly);
    });

    it("create: success for operator", async () => {
      const PROJECT_NAME = "test-project";
      const useIPFS = false;
      const feePercentage = 5;

      const currentProjectId = await coreContract.nextProjectId();
      await coreContract.addOperatingRights(operator);
      const tx = await coreContract.createProject(
        artist,
        PROJECT_NAME,
        PRICE_PER_TOKEN,
        feePercentage,
        useIPFS,
        {
          from: operator,
        }
      );
      const logs = tx.logs[0];
      const {
        _projectId,
        _artistAddress,
        _pricePerTokenInWei,
        _useStorage,
        _projectFeePercentage,
        _projectName,
      } = logs.args;

      // check the create event
      assert.equal(logs.event, "CreateProject");
      assert.equal(_projectName, PROJECT_NAME);
      assert.equal(_projectId.toString(), currentProjectId.toString());
      assert.equal(_artistAddress, artist);
      assert.equal(BN(_pricePerTokenInWei).toString(), PRICE_PER_TOKEN);
      assert.equal(BN(_projectFeePercentage).toString(), feePercentage);
      assert.equal(_useStorage, useIPFS);
      // @todo smth wrong with the project name

      // check the actual project in the contract
      const details = await coreContract.getProjectDetails(currentProjectId);
      const tokenDetails = await coreContract.getProjectTokenDetails(
        currentProjectId
      );
      assert.equal(details.projectName, PROJECT_NAME);
      assert.equal(details.artistAddress, artist);
      assert.equal(
        BN(tokenDetails.pricePerTokenInWei).toString(),
        PRICE_PER_TOKEN
      );
      assert.equal(BN(tokenDetails.feePercentage).toString(), feePercentage);

      insertedProjectId = _projectId.toString();
      // add inactive project
      inactiveProjectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "inactive project",
        PRICE_PER_TOKEN,
        feePercentage,
        useIPFS,
        {
          from: operator,
        }
      );

      // add locked project
      lockedProjectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        accounts[1],
        "locked project",
        PRICE_PER_TOKEN,
        feePercentage,
        useIPFS,
        {
          from: operator,
        }
      );

      await coreContract.toggleLockedProject(lockedProjectId, {
        from: operator,
      });

      // add paused project
      pausedProjectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        accounts[1],
        "paused project",
        PRICE_PER_TOKEN,
        feePercentage,
        useIPFS,
        {
          from: operator,
        }
      );
      await coreContract.toggleActiveProject(pausedProjectId, {
        from: operator,
      });
    });

    // update name
    it("name: update success for artist", async () => {
      const PROJECT_NAME = "test-project-new-name";

      await coreContract.setProjectName(insertedProjectId, PROJECT_NAME, {
        from: artist,
      });

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.projectName, PROJECT_NAME);
    });

    it("name: update fails for non-artist, non-operator", async () => {
      const PROJECT_NAME = "test-project-new-name";

      return coreContract
        .setProjectName(insertedProjectId, PROJECT_NAME, {
          from: accounts[5],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("name: update success for operator", async () => {
      const PROJECT_NAME = "test-project-new-name";

      const tx = await coreContract.setProjectName(
        insertedProjectId,
        PROJECT_NAME,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.projectName, PROJECT_NAME);
    });

    // update artist address
    it("artist address: update success for artist", async () => {
      const tx = await coreContract.setProjectArtistAddress(
        insertedProjectId,
        accounts[5],
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.artistAddress, accounts[5]);
    });

    it("artist address: update fails for non-artist, non-operator", async () => {
      return coreContract
        .setProjectArtistAddress(insertedProjectId, accounts[5], {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("artist address: update success for operator", async () => {
      const tx = await coreContract.setProjectArtistAddress(
        insertedProjectId,
        artist,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.artistAddress, artist);
    });

    // update artist name
    it("artist name: update success for artist", async () => {
      const newName = "new artist name";
      const tx = await coreContract.setProjectArtistName(
        insertedProjectId,
        newName,
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.artist, newName);
    });

    it("artist name: update fails for non-artist, non-operator", async () => {
      const newName = "new artist name";
      return coreContract
        .setProjectArtistName(insertedProjectId, newName, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("artist name: update success for operator", async () => {
      const newName = "artist name";
      const tx = await coreContract.setProjectArtistName(
        insertedProjectId,
        newName,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.artist, newName);
    });

    // update description
    it("description: update success for artist", async () => {
      const newText = "some project description";
      const tx = await coreContract.setProjectDescription(
        insertedProjectId,
        newText,
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.description, newText);
    });

    it("description: update fails for non-artist, non-operator", async () => {
      const newText = "some project description";
      return coreContract
        .setProjectDescription(insertedProjectId, newText, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("description: update success for operator", async () => {
      const newText = "project description";
      const tx = await coreContract.setProjectDescription(
        insertedProjectId,
        newText,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.description, newText);
    });

    // update website
    it("website: update success for artist", async () => {
      const newText = "some website";
      const tx = await coreContract.setProjectWebsite(
        insertedProjectId,
        newText,
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.website, newText);
    });

    it("website: update fails for non-artist, non-operator", async () => {
      const newText = "some website";
      return coreContract
        .setProjectWebsite(insertedProjectId, newText, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("website: update success for operator", async () => {
      const newText = "website";
      const tx = await coreContract.setProjectWebsite(
        insertedProjectId,
        newText,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.website, newText);
    });

    // update license
    it("license: update success for artist", async () => {
      const newText = "some license";
      const tx = await coreContract.setProjectLicense(
        insertedProjectId,
        newText,
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.license, newText);
    });

    it("license: update fails for non-artist, non-operator", async () => {
      const newText = "some license";
      return coreContract
        .setProjectLicense(insertedProjectId, newText, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("license: update success for operator", async () => {
      const newText = "license";
      const tx = await coreContract.setProjectLicense(
        insertedProjectId,
        newText,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectDetails(insertedProjectId);
      assert.equal(details.license, newText);
    });

    // active toggle
    it("active: toggle on for operator", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "inactive project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );
      let details = await coreContract.getProjectDetails(projectId);
      assert.equal(details.active, false);

      await coreContract.toggleActiveProject(projectId, {
        from: operator,
      });
      details = await coreContract.getProjectDetails(projectId);
      assert.equal(details.active, true);

      // setting main project to
      await coreContract.toggleActiveProject(insertedProjectId, {
        from: operator,
      });
    });

    it("active: toggle off for operator", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        accounts[1],
        "inactive project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );

      await coreContract.toggleActiveProject(projectId, {
        from: operator,
      });
      let details = await coreContract.getProjectDetails(projectId);
      assert.equal(details.active, true);

      await coreContract.toggleActiveProject(projectId, {
        from: operator,
      });
      details = await coreContract.getProjectDetails(projectId);
      assert.equal(details.active, false);
    });

    it("active: toggle fails for artist", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "inactive project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );

      return coreContract
        .toggleActiveProject(projectId, {
          from: artist,
        })
        .then(assert.fail)
        .catch(operatorsOnly);
    });

    // paused toggle
    it("paused: toggle on for operator", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "a project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );

      await coreContract.togglePausedProject(projectId, {
        from: operator,
      });
      let details = await coreContract.getProjectDetails(projectId);
      assert.equal(details.paused, false);

      // setting main project to
      await coreContract.togglePausedProject(insertedProjectId, {
        from: operator,
      });
    });

    it("paused: toggle on for artist", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "a project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );

      await coreContract.togglePausedProject(projectId, {
        from: artist,
      });
      let details = await coreContract.getProjectDetails(projectId);
      assert.equal(details.paused, false);
    });

    it("paused: toggle off for operator", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "a project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );
      // default on, switch off
      await coreContract.togglePausedProject(projectId, {
        from: operator,
      });

      await coreContract.togglePausedProject(projectId, {
        from: operator,
      });
      let details = await coreContract.getProjectDetails(projectId);
      assert.equal(details.paused, true);
    });

    it("paused: toggle fails for non-artist, non-operator", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "paused project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );

      return coreContract
        .togglePausedProject(projectId, {
          from: accounts[9],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    // locked toggle
    it("locked: toggle on for operator", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "a project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );

      await coreContract.toggleLockedProject(projectId, {
        from: operator,
      });
      let details = await coreContract.getProjectDetails(projectId);
      assert.equal(details.locked, true);
    });

    it("locked: toggle off fails for operator", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "inactive project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );
      await coreContract.toggleLockedProject(projectId, {
        from: operator,
      });

      return coreContract
        .toggleLockedProject(projectId, {
          from: operator,
        })
        .then(assert.fail)
        .catch(projectIsLocked);
    });

    it("locked: toggle on fails for non-operator", async () => {
      const projectId = (await coreContract.nextProjectId()).toString();
      await coreContract.createProject(
        artist,
        "inactive project",
        PRICE_PER_TOKEN,
        feePercentage,
        false,
        {
          from: operator,
        }
      );

      return coreContract
        .toggleLockedProject(projectId, {
          from: artist,
        })
        .then(assert.fail)
        .catch(operatorsOnly);
    });

    // update price
    it("price: update success for artist", async () => {
      const newPrice = "1000000000000";
      await coreContract.setProjectPricePerTokenInWei(
        insertedProjectId,
        newPrice,
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectTokenDetails(
        insertedProjectId
      );
      assert.equal(getInt(details.pricePerTokenInWei), newPrice);
    });

    it("price: update success for operator", async () => {
      const newPrice = "10000000000000";
      await coreContract.setProjectPricePerTokenInWei(
        insertedProjectId,
        newPrice,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectTokenDetails(
        insertedProjectId
      );
      assert.equal(getInt(details.pricePerTokenInWei), newPrice);
    });

    it("price: update fails for non-approved", async () => {
      const newPrice = "10000000000000";
      return coreContract
        .setProjectPricePerTokenInWei(insertedProjectId, newPrice, {
          from: accounts[9],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    // update max iterations
    it("max iterations: update success for artist", async () => {
      const iterations = 50;
      await coreContract.setProjectMaxIterations(
        insertedProjectId,
        iterations,
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectTokenDetails(
        insertedProjectId
      );
      assert.equal(getInt(details.maxIterations), iterations);
    });

    it("max iterations: update success for operator", async () => {
      const iterations = 100;
      await coreContract.setProjectMaxIterations(
        insertedProjectId,
        iterations,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectTokenDetails(
        insertedProjectId
      );
      assert.equal(getInt(details.maxIterations), iterations);
    });

    it("max iterations: update fails for non-approved", async () => {
      const iterations = 150;
      return coreContract
        .setProjectMaxIterations(insertedProjectId, iterations, {
          from: accounts[9],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("max iterations: update fails for lower iterations", async () => {
      const iterations = 0;
      return coreContract
        .setProjectMaxIterations(insertedProjectId, iterations, {
          from: artist,
        })
        .then(assert.fail)
        .catch(function (error) {
          assert.include(
            error.message,
            "Max iterations lower than current iterations"
          );
        });
    });

    it("max iterations: update fails for max iterations", async () => {
      const iterations = 100001;
      return coreContract
        .setProjectMaxIterations(insertedProjectId, iterations, {
          from: artist,
        })
        .then(assert.fail)
        .catch(maxIs100K);
    });

    it("max iterations: update fails for locked project", async () => {
      const iterations = 1;
      return coreContract
        .setProjectMaxIterations(lockedProjectId, iterations, {
          from: artist,
        })
        .then(assert.fail)
        .catch(projectIsLocked);
    });

    // update max tokens per address
    it("max tokens per address: update success for operator", async () => {
      const maxTokensPerAddress = 5;
      await coreContract.setProjectMaxTokensPerAddress(
        insertedProjectId,
        maxTokensPerAddress,
        {
          from: operator,
        }
      );
      const details = await coreContract.getProjectTokenDetails(
        insertedProjectId
      );

      assert.equal(details.maxTokensPerAddress, maxTokensPerAddress);
    });

    it("max tokens per address: update success for artist", async () => {
      const maxTokensPerAddress = 15;
      await coreContract.setProjectMaxTokensPerAddress(
        insertedProjectId,
        maxTokensPerAddress,
        {
          from: artist,
        }
      );
      const details = await coreContract.getProjectTokenDetails(
        insertedProjectId
      );

      assert.equal(details.maxTokensPerAddress, maxTokensPerAddress);
    });

    it("max tokens per address: update fails for non-artist, non-operator", async () => {
      const maxTokensPerAddress = 15;
      return coreContract
        .setProjectMaxTokensPerAddress(insertedProjectId, maxTokensPerAddress, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("max tokens per address: update fails for > 100,000", async () => {
      const maxTokensPerAddress = 100001;
      return coreContract
        .setProjectMaxTokensPerAddress(insertedProjectId, maxTokensPerAddress, {
          from: operator,
        })
        .then(assert.fail)
        .catch(maxIs100K);
    });

    it("max tokens per address: update fails for locked project", async () => {
      const maxTokensPerAddress = 10;
      return coreContract
        .setProjectMaxTokensPerAddress(lockedProjectId, maxTokensPerAddress, {
          from: operator,
        })
        .then(assert.fail)
        .catch(projectIsLocked);
    });

    // update base uri
    it("base uri: update success for artist", async () => {
      const uri = "http://web.site/";
      await coreContract.setProjectBaseURI(insertedProjectId, uri, {
        from: artist,
      });

      const details = await coreContract.getProjectURIDetails(
        insertedProjectId
      );
      assert.equal(details.baseURI, uri);
    });

    it("base uri: update fails for non-artist, non-operator", async () => {
      const uri = "http://web.site/";
      return coreContract
        .setProjectBaseURI(insertedProjectId, uri, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("base uri: update success for operator", async () => {
      const uri = "http://websi.te/";
      await coreContract.setProjectBaseURI(insertedProjectId, uri, {
        from: operator,
      });

      const details = await coreContract.getProjectURIDetails(
        insertedProjectId
      );
      assert.equal(details.baseURI, uri);
    });

    // update base ipfs uri
    it("ipfs uri: update success for artist", async () => {
      const uri = "ipfs://website/";
      await coreContract.setProjectBaseIpfsURI(insertedProjectId, uri, {
        from: artist,
      });

      const details = await coreContract.getProjectURIDetails(
        insertedProjectId
      );
      assert.equal(details.baseIpfsURI, uri);
    });

    it("ipfs uri: update fails for non-artist, non-operator", async () => {
      const uri = "ipfs://website/";
      return coreContract
        .setProjectBaseIpfsURI(insertedProjectId, uri, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("ipfs uri: update success for operator", async () => {
      const uri = "ipfs://website/";
      await coreContract.setProjectBaseIpfsURI(insertedProjectId, uri, {
        from: operator,
      });

      const details = await coreContract.getProjectURIDetails(
        insertedProjectId
      );
      assert.equal(details.baseIpfsURI, uri);
    });

    // toggleProjectStorage
    it("toggle storage: update success for artist", async () => {
      const currentStatus = await coreContract.getProjectURIDetails(
        insertedProjectId
      );

      await coreContract.toggleProjectStorage(insertedProjectId, {
        from: artist,
      });

      const details = await coreContract.getProjectURIDetails(
        insertedProjectId
      );
      assert.equal(details.useStorage, !currentStatus.useStorage);
    });

    it("toggle storage: update success for operator", async () => {
      const currentStatus = await coreContract.getProjectURIDetails(
        insertedProjectId
      );

      await coreContract.toggleProjectStorage(insertedProjectId, {
        from: operator,
      });

      const details = await coreContract.getProjectURIDetails(
        insertedProjectId
      );
      assert.equal(details.useStorage, !currentStatus.useStorage);
    });

    it("toggle storage: update fails for non-approved", async () => {
      return coreContract
        .toggleProjectStorage(insertedProjectId, {
          from: accounts[9],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("toggle storage: update fails for locked project", async () => {
      return coreContract
        .toggleProjectStorage(lockedProjectId, {
          from: artist,
        })
        .then(assert.fail)
        .catch(projectIsLocked);
    });

    // update collaborator
    it("collaborator: update success for artist", async () => {
      const address = accounts[9];
      const percentage = 5;

      await coreContract.setProjectCollaborator(
        insertedProjectId,
        address,
        percentage,
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectExtraPaymentDetails(
        insertedProjectId
      );
      assert.equal(details.collaboratorAddress, address);
      assert.equal(getInt(details.collaboratorPercentage), percentage);
    });

    it("collaborator: update success for operator", async () => {
      const address = accounts[8];
      const percentage = 15;

      await coreContract.setProjectCollaborator(
        insertedProjectId,
        address,
        percentage,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectExtraPaymentDetails(
        insertedProjectId
      );
      assert.equal(details.collaboratorAddress, address);
      assert.equal(getInt(details.collaboratorPercentage), percentage);
    });

    it("collaborator: update fails for non-artist, non-operator", async () => {
      const address = accounts[9];
      const percentage = 5;

      return coreContract
        .setProjectCollaborator(insertedProjectId, address, percentage, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("collaborator: update fails for more than 100%", async () => {
      const address = accounts[9];
      const percentage = 105;

      return coreContract
        .setProjectCollaborator(insertedProjectId, address, percentage, {
          from: artist,
        })
        .then(assert.fail)
        .catch(maxIs100Percent);
    });

    // royalty percentage
    it("royalty percentage: update success for artist", async () => {
      const percentage = 5;

      await coreContract.setProjectRoyaltyFeePercentage(
        insertedProjectId,
        percentage,
        {
          from: artist,
        }
      );

      const details = await coreContract.getProjectExtraPaymentDetails(
        insertedProjectId
      );
      assert.equal(details.royaltyFeePercentage, percentage);
    });

    it("royalty percentage: update success for operator", async () => {
      const percentage = 15;

      await coreContract.setProjectRoyaltyFeePercentage(
        insertedProjectId,
        percentage,
        {
          from: operator,
        }
      );

      const details = await coreContract.getProjectExtraPaymentDetails(
        insertedProjectId
      );
      assert.equal(details.royaltyFeePercentage, percentage);
    });

    it("royalty percentage: update fails for non-artist, non-operator", async () => {
      const address = accounts[9];
      const percentage = 5;

      return coreContract
        .setProjectRoyaltyFeePercentage(insertedProjectId, percentage, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("royalty percentage: update fails for more than 100%", async () => {
      const percentage = 105;

      return coreContract
        .setProjectRoyaltyFeePercentage(insertedProjectId, percentage, {
          from: artist,
        })
        .then(assert.fail)
        .catch(maxIs100Percent);
    });

    // script metadata
    it("script metadata: update success for artist", async () => {
      const meta = JSON.stringify({ aspectRatio: 1 });

      await coreContract.setProjectScriptMetadata(insertedProjectId, meta, {
        from: artist,
      });

      const details = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      assert.equal(details.scriptMetadata, meta);
    });

    it("script metadata: update success for operator", async () => {
      const meta = JSON.stringify({ aspectRatio: 0.781 });

      await coreContract.setProjectScriptMetadata(insertedProjectId, meta, {
        from: operator,
      });

      const details = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      assert.equal(details.scriptMetadata, meta);
    });

    it("script metadata: update fails for non-artist, non-operator", async () => {
      const meta = JSON.stringify({ aspectRatio: 0.81 });

      return coreContract
        .setProjectScriptMetadata(insertedProjectId, meta, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("script metadata: update fails for locked project", async () => {
      const meta = JSON.stringify({ aspectRatio: 0.91 });

      return coreContract
        .setProjectScriptMetadata(lockedProjectId, meta, {
          from: artist,
        })
        .then(assert.fail)
        .catch(projectIsLocked);
    });

    // script chunks: add
    it("script chunk: add success for artist", async () => {
      const script = "window.somescript = 0;";
      const details = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      assert.equal(getInt(details.scriptChunksCount), 0);

      await coreContract.addProjectScriptChunk(insertedProjectId, script, {
        from: artist,
      });

      const newDetails = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      assert.equal(
        getInt(newDetails.scriptChunksCount),
        parseInt(getInt(details.scriptChunksCount), 10) + 1
      );

      const chunk = await coreContract.getProjectScriptChunkByIndex(
        insertedProjectId,
        0,
        {
          from: artist,
        }
      );
      assert.equal(chunk, script);
    });

    it("script chunk: add success for operator", async () => {
      const script = "window.somescript = 1;";
      const chunkId = 1;
      const details = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      assert.equal(getInt(details.scriptChunksCount), 1);

      await coreContract.addProjectScriptChunk(insertedProjectId, script, {
        from: artist,
      });

      const newDetails = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      assert.equal(
        getInt(newDetails.scriptChunksCount),
        parseInt(getInt(details.scriptChunksCount), 10) + 1
      );

      const chunk = await coreContract.getProjectScriptChunkByIndex(
        insertedProjectId,
        chunkId,
        {
          from: operator,
        }
      );
      assert.equal(chunk, script);
    });

    it("script chunk: add fails for non-artist, non-operator", async () => {
      const script = "window.somescript = 1;";

      return coreContract
        .addProjectScriptChunk(insertedProjectId, script, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("script chunk: add fails for locked project", async () => {
      const script = "window.somescript = 1;";

      return coreContract
        .addProjectScriptChunk(lockedProjectId, script, {
          from: artist,
        })
        .then(assert.fail)
        .catch(projectIsLocked);
    });

    // script chunks: update
    it("script chunk: update success for artist", async () => {
      const script = "window.otherscript = 0;";
      const chunkId = 0;

      await coreContract.setProjectScriptChunkByIndex(
        insertedProjectId,
        chunkId,
        script,
        {
          from: artist,
        }
      );

      const chunk = await coreContract.getProjectScriptChunkByIndex(
        insertedProjectId,
        chunkId,
        {
          from: artist,
        }
      );
      assert.equal(chunk, script);
    });

    it("script chunk: update success for operator", async () => {
      const script = "window.otherscript = 1;";
      const chunkId = 1;

      await coreContract.setProjectScriptChunkByIndex(
        insertedProjectId,
        chunkId,
        script,
        {
          from: operator,
        }
      );

      const chunk = await coreContract.getProjectScriptChunkByIndex(
        insertedProjectId,
        chunkId,
        {
          from: artist,
        }
      );
      assert.equal(chunk, script);
    });

    it("script chunk: update fails for non-artist, non-operator", async () => {
      const script = "window.somescript = 1;";
      const chunkId = 0;

      return coreContract
        .setProjectScriptChunkByIndex(insertedProjectId, chunkId, script, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("script chunk: update fails for locked project", async () => {
      const script = "window.somescript = 1;";
      const chunkId = 0;
      return coreContract
        .setProjectScriptChunkByIndex(lockedProjectId, chunkId, script, {
          from: artist,
        })
        .then(assert.fail)
        .catch(projectIsLocked);
    });

    // script remove
    it("script chunk: remove last index success for artist", async () => {
      const details = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      const count = parseInt(getInt(details.scriptChunksCount), 10) - 1;

      await coreContract.removeProjectLastScriptChunk(insertedProjectId, {
        from: artist,
      });

      const newDetails = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      const newCount = parseInt(getInt(newDetails.scriptChunksCount), 10) - 1;
      assert.equal(count - 1, newCount);
    });

    it("script chunk: remove last index success for operator", async () => {
      const details = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      const count = parseInt(getInt(details.scriptChunksCount), 10) - 1;

      await coreContract.removeProjectLastScriptChunk(insertedProjectId, {
        from: operator,
      });

      const newDetails = await coreContract.getProjectScriptDetails(
        insertedProjectId
      );
      const newCount = parseInt(getInt(newDetails.scriptChunksCount), 10) - 1;
      assert.equal(count - 1, newCount);
    });

    it("script chunk: remove last index fails for non-artist, non-operator", async () => {
      return coreContract
        .removeProjectLastScriptChunk(insertedProjectId, {
          from: accounts[6],
        })
        .then(assert.fail)
        .catch(operatorsOrArtistOnly);
    });

    it("script chunk: remove last index fails for locked project", async () => {
      return coreContract
        .removeProjectLastScriptChunk(lockedProjectId, {
          from: artist,
        })
        .then(assert.fail)
        .catch(projectIsLocked);
    });
  });

  describe("Minting", async () => {
    it("success for minter", async () => {
      const tx = await coreContract.mint(artist, insertedProjectId, operator, {
        from: minter,
      });
      const tokenId = 100000;
      const mintEvent = tx.logs[1];
      const transferEvent = tx.logs[0];

      assert.equal(
        transferEvent.args.from,
        "0x0000000000000000000000000000000000000000"
      );
      assert.equal(transferEvent.args.to, artist);
      assert.equal(getInt(transferEvent.args.tokenId), tokenId);

      assert.equal(mintEvent.args._to, artist);
      assert.equal(getInt(mintEvent.args._tokenId), tokenId);
      assert.equal(getInt(mintEvent.args._projectId), insertedProjectId);

      const token = await coreContract.getTokenById(tokenId);
      assert.equal(getInt(token.projectId), insertedProjectId);
      assert.equal(token.hash, mintEvent.args._hash);

      const owner = await coreContract.ownerOf(tokenId);
      assert.equal(owner, artist);
    });

    it("success for admin", async () => {
      const tx = await coreContract.mint(artist, insertedProjectId, operator, {
        from: admin,
      });
      const tokenId = 100001;
      const mintEvent = tx.logs[1];
      const transferEvent = tx.logs[0];

      assert.equal(
        transferEvent.args.from,
        "0x0000000000000000000000000000000000000000"
      );
      assert.equal(transferEvent.args.to, artist);
      assert.equal(getInt(transferEvent.args.tokenId), tokenId);

      assert.equal(mintEvent.args._to, artist);
      assert.equal(getInt(mintEvent.args._tokenId), tokenId);
      assert.equal(getInt(mintEvent.args._projectId), insertedProjectId);

      const token = await coreContract.getTokenById(tokenId);
      assert.equal(getInt(token.projectId), insertedProjectId);
      assert.equal(token.hash, mintEvent.args._hash);

      const owner = await coreContract.ownerOf(tokenId);
      assert.equal(owner, artist);
    });

    it("fails for non-minter", async () => {
      return coreContract
        .mint(artist, insertedProjectId, operator, {
          from: accounts[7],
        })
        .then(assert.fail)
        .catch(mintersOnly);
    });

    it("fails for more than max tokens per address", async () => {
      const maxTokensPerAddress = 2;
      await coreContract.setProjectMaxTokensPerAddress(
        insertedProjectId,
        maxTokensPerAddress,
        {
          from: operator,
        }
      );

      return coreContract
        .mint(artist, insertedProjectId, operator, {
          from: admin,
        })
        .then(assert.fail)
        .catch(mintingMaxTokensByAddress);
    });

    it("fails for more than max iterations", async () => {
      const maxIterations = 3;
      await coreContract.setProjectMaxIterations(
        insertedProjectId,
        maxIterations,
        {
          from: operator,
        }
      );
      await coreContract.mint(admin, insertedProjectId, operator, {
        from: admin,
      });

      return coreContract
        .mint(operator, insertedProjectId, operator, {
          from: admin,
        })
        .then(assert.fail)
        .catch(mintingMaxIterations);
    });

    it("fails for inactive project", async () => {
      const maxTokens = 5;
      await coreContract.setProjectMaxIterations(inactiveProjectId, maxTokens, {
        from: operator,
      });
      await coreContract.setProjectMaxTokensPerAddress(
        inactiveProjectId,
        maxTokens,
        {
          from: operator,
        }
      );

      return coreContract
        .mint(artist, inactiveProjectId, operator, {
          from: admin,
        })
        .then(assert.fail)
        .catch(projectIsInactive);
    });

    it("fails for paused project", async () => {
      const maxTokens = 5;
      await coreContract.setProjectMaxIterations(pausedProjectId, maxTokens, {
        from: operator,
      });
      await coreContract.setProjectMaxTokensPerAddress(
        pausedProjectId,
        maxTokens,
        {
          from: operator,
        }
      );

      return coreContract
        .mint(artist, pausedProjectId, operator, {
          from: admin,
        })
        .then(assert.fail)
        .catch(projectIsPaused);
    });

    it("has max supply eq supply", async () => {
      const balance = await coreContract.totalSupply();

      const details = await coreContract.getProjectTokenDetails(
        insertedProjectId
      );
      assert.equal(getInt(details.iterations), getInt(details.maxIterations));
    });
  });

  describe("Tokens", async () => {
    it("has right token owner", async () => {
      const tokenId = 100000;
      const owner = await coreContract.ownerOf(tokenId);
      assert.equal(owner, artist);

      const firstToken = await coreContract.tokenOfOwnerByIndex(artist, 0);
      assert.equal(getInt(firstToken), tokenId);

      const balance = await coreContract.balanceOf(artist);
      assert.equal(2, getInt(balance));
    });

    it("has correct total supply", async () => {
      const balance = await coreContract.totalSupply();
      assert.equal(3, getInt(balance));
    });

    //token uri
    it("token uri", async () => {
      const httpUri = "http://websi.te/";
      const tokenId = 100001;
      const uri = await coreContract.tokenURI(tokenId);
      assert.equal(uri, `${httpUri}${tokenId}`);
    });

    it("token uri fails for invalid token", async () => {
      const tokenId = 500000;

      return coreContract
        .tokenURI(tokenId)
        .then(assert.fail)
        .catch(validTokenOnly);
    });

    // royaltuy percentage
    it("returns royalty info for token", async () => {
      const tokenId = 100001;
      const royaltyFee = 10;
      const salePrice = 1000;
      await coreContract.setProjectRoyaltyFeePercentage(
        insertedProjectId,
        royaltyFee
      );
      const royaltyInfo = await coreContract.royaltyInfo(tokenId, salePrice);
      const fundsForArtist = parseInt(getInt(royaltyInfo.royaltyAmount), 10);
      const receiver = royaltyInfo.receiver;
      const projectDetails = await coreContract.getProjectDetails(
        insertedProjectId
      );

      assert.equal(fundsForArtist, (salePrice * royaltyFee) / 100);
      assert.equal(receiver, projectDetails.artistAddress);
    });

    it("royalty info fails for invalid token", async () => {
      const tokenId = 500000;

      return coreContract
        .royaltyInfo(tokenId, 1000)
        .then(assert.fail)
        .catch(validTokenOnly);
    });
  });
});
