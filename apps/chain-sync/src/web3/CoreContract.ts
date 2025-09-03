import MintoriaStore from '@abis/MintoriaStore.json';
import Web3 from 'web3';
import * as config from '@config/config';
import Events from '@common/types/Event';
import { Network, Networks } from '@common/types/Network';
import { logger } from '@common/services/Logger';
import { getRandomInfuraId } from '@common/utils/infura';

export default class CoreContract {
  contract: any;
  web3: Web3;
  address: string;
  infuraId: string = '';

  constructor(network: Network, address: string) {
    let web3Provider =
      network === Networks.Mainnet
        ? config.WEB3_PROVIDER_MAINNET
        : config.WEB3_PROVIDER_TESTNET;

    if (config.IS_PRODUCTION) {
      this.infuraId = getRandomInfuraId(config.INFURA_IDS);
      web3Provider = `${web3Provider}/${this.infuraId}`;
    }

    this.web3 = new Web3(web3Provider || '');
    this.contract = new this.web3.eth.Contract(
      MintoriaStore.abi as any,
      address,
    );
    this.address = address;
  }

  async getPastMintEvents(fromBlock: 'latest' | number = 0) {
    const options = {
      filter: {},
      fromBlock,
      toBlock: 'latest',
    };
    try {
      const events = await this.contract.getPastEvents(
        Events.mint,
        options,
      );
      return events;
    } catch (e) {
      logger.error('Cannot get past mint events', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getPastUpdateProjectEvents(fromBlock: 'latest' | number = 0) {
    const options = {
      filter: {},
      fromBlock,
      toBlock: 'latest',
    };
    try {
      const events = await this.contract.getPastEvents(
        Events.projectUpdate,
        options,
      );
      return events;
    } catch (e) {
      logger.error('Cannot get past update project events', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getPastTransferEvents(fromBlock: 'latest' | number = 0) {
    const options = {
      filter: {},
      fromBlock,
      toBlock: 'latest',
    };
    try {
      const events = await this.contract.getPastEvents(
        Events.transfer,
        options,
      );
      return events;
    } catch (e) {
      logger.error('Cannot get past transfer events', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getTokenById(id: number) {
    try {
      const data = await this.contract.methods
        .getTokenById(id)
        .call();
      return data;
    } catch (e) {
      logger.error('Cannot get token by id', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getProjectDetails(id: number) {
    try {
      const data = await this.contract.methods
        .getProjectDetails(id)
        .call();
      return data;
    } catch (e) {
      logger.error('Cannot get project by id', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getProjectTokenDetails(id: number) {
    try {
      const data = await this.contract.methods
        .getProjectTokenDetails(id)
        .call();
      return data;
    } catch (e) {
      logger.error('Cannot get project token details', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getProjectURI(id: number) {
    try {
      const data = await this.contract.methods
        .getProjectURIDetails(id)
        .call();
      return data;
    } catch (e) {
      logger.error('Cannot get project URI details', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getProjectExtraPaymentDetails(id: number) {
    try {
      const data = await this.contract.methods
        .getProjectExtraPaymentDetails(id)
        .call();
      return data;
    } catch (e) {
      logger.error('Cannot get project extra payment details', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getProjectScriptDetails(id: number) {
    try {
      const data = await this.contract.methods
        .getProjectScriptDetails(id)
        .call();
      return data;
    } catch (e) {
      logger.error('Cannot get project script details', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getProjectScriptChunkByIndex(id: number, idx: number) {
    try {
      const data = await this.contract.methods
        .getProjectScriptChunkByIndex(id, idx)
        .call();
      return data;
    } catch (e) {
      logger.error('Cannot get project script by index', {
        infuraId: this.infuraId,
        error: e,
      });
      return [];
    }
  }

  async getPastCreateProjectEvents(fromBlock: 'latest' | number = 0) {
    const options = {
      filter: {},
      fromBlock,
      toBlock: 'latest',
    };
    return this.contract.getPastEvents(Events.projectCreate, options);
  }
}
