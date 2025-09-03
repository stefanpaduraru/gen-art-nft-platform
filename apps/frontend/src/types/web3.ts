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
  events: {
    [key: string]: Web3Event;
  };
};

export type EventTypes =
  | "CreateProject"
  | "UpdateProject"
  | "Mint"
  | "Transfer";

export type Web3Event = {
  address: string;
  blockHash: string;
  blockNumber: number;
  event: string;
  id: string;
  logIndex: number;
  transactionHash: string;
  transactionIndex: number;
  type: string;
  raw: {
    data: string;
    topics: string[];
  };
  returnValues: { [key: string]: any };
  signature: string;
};
