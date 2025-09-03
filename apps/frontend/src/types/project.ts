import { Contract } from "./contract";
import { TransferRequest } from "./transferRequest";
import { Token } from "./token";
import { User } from "./user";

export type DropType = "fixed" | "dutch";

export enum DropTypes {
  Fixed = "fixed",
  Dutch = "dutch",
}

export type URIInfo = {
  baseURI: string;
  baseIpfsURI: string;
};

export type Feature = {
  id: number;
  name: string;
};

export type ProjectSettings = {
  renderDelay: number;
  dropType: DropType;
  dropDetails?: string;
  additionalDetails?: string;
};

export type Project = {
  id: number;
  testnetId: number;
  mainnetId: number;
  chainId?: number;
  templateId: number;
  artist: string;
  description: string;
  license: string;
  name: string;
  website: string;
  artistAddress: string;
  pricePerTokenInWei: string;
  iterations: string;
  maxIterations: string | number;
  maxTokensPerAddress: string | number;
  collaboratorAddress?: string;
  collaboratorPercentage?: number;
  royaltyFeePercentage?: number;
  useStorage: boolean;
  baseURI: string;
  baseIpfsURI: string;
  metadata: string;
  paused: boolean;
  active: boolean;
  locked: boolean;
  startingAt: Date;
  completedAt: Date;
  aspectRatio: string;
  scriptType: string;
  script: string;
  deployed: boolean;
  type: ProjectType;
  features: Feature[];
  tokenURL: string;
  createdAt: Date;
  isCompleted: boolean;
  isDeployed: boolean;
  isMainnet: boolean;
  isTestnet: boolean;
  contract?: Contract;
  minterContract?: Contract;
  user?: User;
  tokens?: Token[];
  termsAccepted: boolean;
  transferRequests?: TransferRequest[];
  featuredToken: Token;
  votes: number;
  renderDelay: number;
  dropType: DropType;
  dropDetails?: string;
  additionalDetails?: string;
};

export type ProjectMetadata = {
  aspectRatio: number;
  scriptType: string;
};

export type OptionalProjectMetadata = {
  aspectRatio?: number;
  scriptType?: string;
};

export type ScriptType = "p5js" | "javascript";

export enum ScriptTypes {
  P5JS = "p5js",
  JAVASCRIPT = "javascript",
}

export type ExtendedProject = Project & {
  contract: Contract;
  user: User;
  tokens: Token[];
  mainnetProject?: Project;
  testnetProject?: Project;
};

export type ProjectType = "mainnet" | "testnet" | "template";
export enum ProjectTypes {
  Mainnet = "mainnet",
  Testnet = "testnet",
  Template = "template",
}
