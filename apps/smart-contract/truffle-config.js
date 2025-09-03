require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    development: {
      host: "0.0.0.0",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 2000000000000,
      gasLimit: 2000000000000,
    },
  },
  contracts_directory: "./src/contracts/Mintoria.*.sol",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  plugins: ["truffle-contract-size", "solidity-coverage"],
};
