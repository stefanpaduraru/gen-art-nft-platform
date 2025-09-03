import axios from "axios";
import config from "../../config/config";
import { MintoriaGallery } from "../../types/galleries";
import { Network } from "../../types/network";
import { TokenWithProject } from "../../types/token";

export const fetchTokenDetails = async (
  tokenId: number | string,
  projectId: number | string,
  network: Network,
  gallery: MintoriaGallery
): Promise<TokenWithProject> => {
  const result = await axios.get(
    `${config.BE_URL}/token/internal/${gallery}/${network}/${tokenId}`
  );
  return result.data as TokenWithProject;
};

export const fetchTokenFeed = async (): Promise<TokenWithProject[]> => {
  const result = await axios.get(`${config.BE_URL}/token/feed`);
  return result.data as TokenWithProject[];
};
