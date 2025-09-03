import Web3 from "web3";
import * as Bluebird from "bluebird";
import MintoriaStore from "../abis/MintoriaStore.json";
import { Web3Error, Web3Receipt } from "../types/web3";
import { getWeb3Provider } from "../util/web3";
import { Web3ContractDetails } from "../types/web3Contract";
import { Web3ProjectDetails } from "../types/web3Project";
import { Network } from "../types/network";

type SuccessCallback = (receipt: Web3Receipt) => void;
type ErrorCallback = (error: Web3Error, receipt: Web3Receipt) => void;
type HashCallback = (hash: string) => void;

export default class CoreContract {
  contract: any;
  web3: Web3;
  network: Network;

  constructor(address: string, network: Network) {
    this.web3 = getWeb3Provider(network);
    this.contract = new this.web3.eth.Contract(
      MintoriaStore.abi as any,
      address
    );
    this.network = network;
  }

  async setRandomizerAddress(
    newAddress: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setRandomizerAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setRandomizerAddress(newAddress)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setAdminFeeSplitPercentage(
    newPercentage: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setAdminFeeSplitPercentage
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setAdminFeeSplitPercentage(newPercentage)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setMintoriaAddress(
    newAddress: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setMintoriaAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setMintoriaAddress(newAddress)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setMintoriaFeeSplitPercentage(
    newPercentage: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setMintoriaFeeSplitPercentage
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setMintoriaFeeSplitPercentage(newPercentage)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async createProject(
    artistAddress: string,
    projectName: string,
    pricePerTokenInWei: string,
    feePercentage: string,
    useStorage: boolean,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.createProject
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .createProject(
              artistAddress,
              projectName,
              BigInt(pricePerTokenInWei),
              BigInt(feePercentage),
              useStorage
            )
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectName(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectName
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectName(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectArtistAddress(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectArtistAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectArtistAddress(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectArtistName(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectArtistName
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectArtistName(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectPricePerTokenInWei(
    projectId: number,
    newValue: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectPricePerTokenInWei
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectPricePerTokenInWei(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectDescription(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectDescription
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectDescription(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectWebsite(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectWebsite
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectWebsite(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectLicense(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectLicense
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectLicense(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectMaxIterations(
    projectId: number,
    newValue: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectMaxIterations
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectMaxIterations(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectMaxTokensPerAddress(
    projectId: number,
    newValue: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectMaxTokensPerAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectMaxTokensPerAddress(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectCollaborator(
    projectId: number,
    newAddress: string,
    newPercentage: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectCollaborator
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectCollaborator(projectId, newAddress, newPercentage)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectRoyaltyFeePercentage(
    projectId: number,
    newValue: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectRoyaltyFeePercentage
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectRoyaltyFeePercentage(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async updateProjectScriptChunk(
    projectId: number,
    index: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectScriptChunkByIndex
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectScriptChunkByIndex(projectId, index, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async addProjectScriptChunk(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.addProjectScriptChunk
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .addProjectScriptChunk(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async addOperatingRights(
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.addOperatingRights
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .addOperatingRights(newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async checkOperatingRights(newValue: string) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.operators
    ) {
      const result = await this.contract.methods.operators(newValue).call();
      return result;
    }
  }

  async removeOperatingRights(
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.removeOperatingRights
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .removeOperatingRights(newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async addMintRights(
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setRandomizerAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .addMintRights(newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async checkMintRights(newValue: string) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.minters
    ) {
      const result = await this.contract.methods.minters(newValue).call();
      return result;
    }
  }

  async removeMintRights(
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.removeMintRights
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .removeMintRights(newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async removeLastProjectScriptChunk(
    projectId: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setRandomizerAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .removeProjectLastScriptChunk(projectId)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectBaseURI(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectDescription
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectBaseURI(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectBaseIpfsURI(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectDescription
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectBaseIpfsURI(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjecScriptMetadata(
    projectId: number,
    newValue: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectDescription
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectScriptMetadata(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async setProjectFeePercentage(
    projectId: number,
    newValue: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setProjectFeePercentage
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .setProjectFeePercentage(projectId, newValue)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async toggleActiveProject(
    projectId: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setRandomizerAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .toggleActiveProject(projectId)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async togglePausedProject(
    projectId: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setRandomizerAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .togglePausedProject(projectId)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async toggleLockedProject(
    projectId: number,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.setRandomizerAddress
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .toggleLockedProject(projectId)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async mintToken(
    fromAddress: string,
    projectId: number,
    toAddress: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (this.contract && this.contract.methods && this.contract.methods.mint) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .mint(fromAddress, projectId, toAddress)
            .send({
              from: accounts[0],
            })
            .on("receipt", (receipt: Web3Receipt) => {
              successCallback(receipt);
            })
            .on("error", (error: Web3Error, receipt: any) => {
              errorCallback(error, receipt);
            })
            .on("transactionHash", (hash: string) => {
              hashCallback(hash);
            });
        }
      });
    }
  }

  async getProjectDetails(
    projectId: number
  ): Promise<Web3ProjectDetails | undefined> {
    if (this.contract && this.contract.methods) {
      try {
        const result = {} as Web3ProjectDetails;
        const mainProjectDetails = await this.contract.methods
          .getProjectDetails(projectId)
          .call();

        result.name = mainProjectDetails.projectName;
        result.description = mainProjectDetails.description;
        result.artist = mainProjectDetails.artist;
        result.artistAddress = mainProjectDetails.artistAddress;
        result.website = mainProjectDetails.website;
        result.active = mainProjectDetails.active;
        result.paused = mainProjectDetails.paused;
        result.locked = mainProjectDetails.locked;
        result.license = mainProjectDetails.license;

        const projectTokenDetails = await this.contract.methods
          .getProjectTokenDetails(projectId)
          .call();
        result.iterations = projectTokenDetails.iterations;
        result.maxIterations = projectTokenDetails.maxIterations;
        result.maxTokensPerAddress = projectTokenDetails.maxTokensPerAddress;
        result.pricePerTokenInWei = projectTokenDetails.pricePerTokenInWei;
        result.feePercentage = projectTokenDetails.feePercentage;

        const projectURI = await this.contract.methods
          .getProjectURIDetails(projectId)
          .call();
        result.useStorage = projectURI.useStorage;
        result.baseURI = projectURI.baseURI;
        result.baseIpfsURI = projectURI.baseIpfsURI;
        const extraPaymentDetails = await this.contract.methods
          .getProjectExtraPaymentDetails(projectId)
          .call();

        result.collaboratorAddress = extraPaymentDetails.collaboratorAddress;
        result.collaboratorPercentage =
          extraPaymentDetails.collaboratorPercentage;
        result.royaltyFeePercentage = extraPaymentDetails.royaltyFeePercentage;

        const scriptDetails = await this.contract.methods
          .getProjectScriptDetails(projectId)
          .call();

        result.scriptChunksCount = scriptDetails.scriptChunksCount;
        result.metadata = scriptDetails.scriptMetadata;
        const tokens = await this.contract.methods
          .getProjectTokens(projectId)
          .call();
        result.tokens = tokens;

        if (result.scriptChunksCount > 0) {
          const count = result.scriptChunksCount;
          const idx = Array.from({ length: count }, (x, i) => i);

          const chunks = await Bluebird.Promise.map(
            idx,
            (i) =>
              this.contract.methods
                .getProjectScriptChunkByIndex(projectId, i)
                .call(),
            { concurrency: 1 }
          );
          result.scriptChunks = chunks;
          result.script = chunks.join("");
        }
        //
        return result;
      } catch (e) {
        console.log("Error fetching project details: ", e);
      }
      return;
    }
  }

  async getContractDetails(): Promise<Web3ContractDetails | undefined> {
    if (this.contract && this.contract.methods) {
      try {
        const randomizerContract = await this.contract.methods
          .mintoriaRandomizerContract()
          .call();
        const adminAddress = await this.contract.methods.owner().call();
        const mintoriaAddress = await this.contract.methods
          .mintoriaAddress()
          .call();
        const adminFeeSplitPercentage = await this.contract.methods
          .adminFeeSplitPercentage()
          .call();
        const mintoriaFeeSplitPercentage = await this.contract.methods
          .mintoriaFeeSplitPercentage()
          .call();
        const nextProjectId = await this.contract.methods
          .nextProjectId()
          .call();

        return {
          mintoriaRandomizerContract: randomizerContract,
          adminAddress,
          mintoriaAddress,
          adminFeeSplitPercentage,
          mintoriaFeeSplitPercentage,
          nextProjectId,
        };
      } catch (e) {
        console.log("Error fetching contract details: ", e);
      }
      return;
    }
  }

  async getPastTransferEvents() {
    // @todo to add parameter current contract address or to move to main contract class
    const options = {
      filter: {},
      fromBlock: 0,
      toBlock: "latest",
    };
    return this.contract.getPastEvents("Transfer", options);
  }
}
