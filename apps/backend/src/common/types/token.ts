type Token = {
  platform: string;
  tokenID: number;
  series: string;
  animation_url: string;
  image: string;
  external_url: string;
  aspect_ratio: string;
  traits: TokenTrait[];
  token_hash: string;
  features: TokenFeatures;
};
type Project = {
  payout_address: string;
  name: string;
  artist: string;
  description: string;
  script_type: string;
  curation_status: string;
  website: string;
  collection_name: string;
  license: string;
  usesStorage: boolean;
  artistAddress: string;
};
type RoyaltyInfo = {
  additionalPayee: string;
  additionalPayeePercentage: number;
};
type TokenFeatures = { [key: string]: any };
type TokenTrait = {
  trait_type: string;
  value: string;
};
