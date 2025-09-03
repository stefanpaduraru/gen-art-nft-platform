export type Web3Error = {
  code: number;
  message: string;
  stack: string;
};

export type Web3Receipt = {
  blockHash: string;
  blockNumber: number;
  contractAddress: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  from: string;
  to: string;
  status: boolean;
  transactionHash: string;
  events: Web3Event[];
};

export type Web3Event = {
  blockHash: string;
  blockNumber: number;
  address: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  event: string;
  id: string;
  logIndex: number;
  transactionHash: string;
  transactionIndex: number;
  type: string;
  raw: string[];
  returnValues: any;
};
