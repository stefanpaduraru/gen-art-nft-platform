import Web3 from "web3";
import MintoriaMain from "../abis/MintoriaMain.json";
import { Web3Error, Web3Receipt } from "../types/web3";
import { getWeb3Provider } from "../util/web3";

type SuccessCallback = (receipt: Web3Receipt) => void;
type ErrorCallback = (error: Web3Error, receipt: Web3Receipt) => void;
type HashCallback = (hash: string) => void;

export default class MintContract {
  contract: any;
  web3: Web3;

  constructor(address: string) {
    this.web3 = getWeb3Provider();
    this.contract = new this.web3.eth.Contract(
      MintoriaMain.abi as any,
      address
    );
  }

  async purchase(
    projectId: number,
    pricePerTokenInWei: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    hashCallback: HashCallback
  ) {
    if (
      this.contract &&
      this.contract.methods &&
      this.contract.methods.purchase
    ) {
      this.web3.eth.getAccounts((error, accounts) => {
        if (accounts && accounts[0]) {
          this.contract.methods
            .purchase(projectId)
            .send({
              from: accounts[0],
              value: pricePerTokenInWei,
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

  async getPastMintEvents() {
    const options = {
      filter: {},
      fromBlock: 0,
      toBlock: "latest",
    };
    return this.contract.getPastEvents("Mint", options);
  }
}
