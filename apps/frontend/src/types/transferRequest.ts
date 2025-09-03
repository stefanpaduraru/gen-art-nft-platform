import { Project } from "./project";

export enum TransferTypes {
  Testnet = "testnet",
  Mainnet = "mainnet",
}

export enum TransferStateTypes {
  Created = "created",
  Approved = "approved",
  Denied = "denied",
}

export type TransferRequest = {
  id: number;
  project?: Project;
  state: TransferStateTypes;
  type: TransferTypes;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
};
