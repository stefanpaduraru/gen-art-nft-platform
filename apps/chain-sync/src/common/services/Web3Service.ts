import CoreContract from '@src/web3/CoreContract';
import { Network } from '@common/types/Network';

class Web3Service {
  contract: CoreContract;
  network: Network;
  constructor(network: Network, address: string) {
    this.network = network;
    this.contract = new CoreContract(network, address);
  }

  async getPastMintEvents(fromBlock: 'latest' | number = 0) {
    return this.contract.getPastMintEvents(fromBlock);
  }

  async getPastCreateProjectEvents(fromBlock: 'latest' | number = 0) {
    return this.contract.getPastCreateProjectEvents(fromBlock);
  }

  async getPastUpdateProjectEvents(fromBlock: 'latest' | number = 0) {
    return this.contract.getPastUpdateProjectEvents(fromBlock);
  }

  async getPastTransferEvents(fromBlock: 'latest' | number = 0) {
    return this.contract.getPastTransferEvents(fromBlock);
  }

  async getTokenById(id: number) {
    return this.contract.getTokenById(id);
  }

  async getProjectDetails(id: number) {
    return this.contract.getProjectDetails(id);
  }

  async getProjectTokenDetails(id: number) {
    return this.contract.getProjectTokenDetails(id);
  }

  async getProjectExtraPaymentDetails(id: number) {
    return this.contract.getProjectExtraPaymentDetails(id);
  }

  async getProjectScriptDetails(id: number) {
    return this.contract.getProjectScriptDetails(id);
  }

  async getProjectScriptChunkByIndex(id: number, idx: number) {
    return this.contract.getProjectScriptChunkByIndex(id, idx);
  }

  async getProjectURI(id: number) {
    return this.contract.getProjectURI(id);
  }
}
export default Web3Service;
