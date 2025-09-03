import { Project } from "./project";
import { Trait } from "./trait";

export type Token = {
  id: number;
  hash: string;
  owner: string;
  traits?: Trait[];
  token: number;
  project?: Project;
  imageURL?: string;
  rarityScore: number;
  rarityRank?: number;
  rendered?: boolean;
  createdAt?: string;
};

export type TokenWithProject = {
  id: number;
  hash: string;
  owner: string;
  traits?: Trait[];
  token: number;
  imageURL?: string;
  rarityScore: number;
  rarityRank?: number;
  rendered?: boolean;
  project: Project;
  liveViewURL?: string;
  createdAt?: string;
};

export type FullToken = {
  tokenID: number;
  token_hash: string;
  payout_address: string;
  traits?: Trait[];
  project_id: number;
  project: Project;
  script_type: string;
  license: string;
};
