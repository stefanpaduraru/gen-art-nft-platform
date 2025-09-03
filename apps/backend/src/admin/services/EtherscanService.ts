import { logger } from '@common/services/Logger';
import * as config from '@config/config';
import axios from 'axios';

type EtherscanResponse<ResultType> = {
  status: number;
  message: string;
  result: ResultType;
};

type GasPrice = {
  LastBlock: number;
  SafeGasPrice: number;
  ProposeGasPrice: number;
  FastGasPrice: number;
  suggestBaseFee: number;
  gasUsedRatio: string;
};

class EtherscanServiceImpl {
  public apiKey: string;
  public url: string;

  public constructor() {
    this.apiKey = config.ETHERSCAN_API_KEY;
    this.url = `https://api.etherscan.io/api?apikey=${this.apiKey}`;
  }

  public async getGasPrice() {
    try {
      const result = await axios.get<EtherscanResponse<GasPrice>>(
        `${this.url}&module=gastracker&action=gasoracle`,
      );

      return result.data.result;
    } catch (e) {
      logger.info("Coulnd't fetch ETH balance.");
    }
    return {} as GasPrice;
  }

  public async getBalance(address: string) {
    try {
      const response = await axios.get<EtherscanResponse<string>>(
        `${this.url}&module=account&action=balance&address=${address}&tag=latest`,
      );

      return response.data.result;
    } catch (e) {
      logger.info("Coulnd't fetch ETH balance.");
    }
    return '0';
  }
}

const EtherscanService = new EtherscanServiceImpl();

export default EtherscanService;
