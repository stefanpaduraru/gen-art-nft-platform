export type Web3ProjectDetails = {
  name: string;
  artist: string;
  artistAddress: string;
  description: string;
  website: string;
  license: string;
  iterations: number;
  maxIterations: number;
  maxTokensPerAddress: number;

  metadata: string;
  scriptChunksCount: number;
  scriptChunks: string[];
  script: string;

  useStorage: boolean;
  baseURI: string;
  baseIpfsURI: string;
  feePercentage: number;
  collaboratorAddress: string;
  collaboratorPercentage: number;
  royaltyFeePercentage: number;
  tokens: number[];
  paused: boolean;
  active: boolean;
  locked: boolean;
  pricePerTokenInWei: number;
};
