export type StatusResponse = {
  logs: Array<LogItem>;
  etherData: EtherData;
  gasPrice: GasPriceResponse;
};

export type EtherData = {
  gasPrice: GasPriceResponse;
  balanceInETH: number;
};

export type GasPriceResponse = {
  fast: number;
  proposed: number;
  safe: number;
  suggested: number;
};

export type LogItem = {
  [key: string]: any;
};

export type NumbersResponse = {
  tokens: number;
  projects: {
    templates: number;
    mainnet: number;
    testnet: number;
  };
};
