import HumioClient from '@admin/services/HumioService';
import { ProjectTypes } from '@common/entities/Project';
import EtherscanService from './EtherscanService';
import ProjectService from './ProjectService';
import TokenService from './TokenService';
import Web3 from 'web3';
import * as config from '@config/config';
import { StatusFrequency } from '@common/types/Status';

class StatusServiceImpl {
  public async getStatus(frequency: StatusFrequency) {
    const logs = await HumioClient.getLogs(frequency);
    const gasPrice = await EtherscanService.getGasPrice();
    const balance = await EtherscanService.getBalance(
      config.MINTORIA_ADDRESS,
    );
    const balanceInETH = Web3.utils.fromWei(balance, 'ether');

    return {
      logs,
      etherData: {
        gasPrice: {
          safe: gasPrice.SafeGasPrice,
          proposed: gasPrice.ProposeGasPrice,
          fast: gasPrice.FastGasPrice,
          suggested: gasPrice.suggestBaseFee,
        },
        balanceInETH,
      },
    };
  }

  public async getNumbers() {
    const templates = await ProjectService.getProjectCount(
      ProjectTypes.Template,
    );
    const mainnet = await ProjectService.getProjectCount(
      ProjectTypes.Mainnet,
    );
    const testnet = await ProjectService.getProjectCount(
      ProjectTypes.Testnet,
    );
    const projects = { templates, mainnet, testnet };

    const tokens = await TokenService.getMainnetCount();
    return { projects, tokens };
  }

  public async getGasPrice() {
    return EtherscanService.getGasPrice();
  }
}

const StatusService = new StatusServiceImpl();
export default StatusService;
