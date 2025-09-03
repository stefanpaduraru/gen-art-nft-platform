import axios from "axios";
import config from "../../config/config";
import { TokenWithProject } from "../../types/token";
import getAuthHeader from "../app/common";

export const fetchMainnetTokenList = async (
  token: string | null,
  query: string
): Promise<TokenWithProject[]> => {
  const headers = getAuthHeader(token || "");
  const result = await axios.get(
    `${config.BE_URL}/admin/tokens/mainnet?query=${query}`,
    {
      headers,
    }
  );
  return result.data as TokenWithProject[];
};

export const fetchTestnetTokenList = async (
  token: string | null,
  query: string
): Promise<TokenWithProject[]> => {
  const headers = getAuthHeader(token || "");
  const result = await axios.get(
    `${config.BE_URL}/admin/tokens/testnet?query=${query}`,
    {
      headers,
    }
  );
  return result.data as TokenWithProject[];
};

export const renderToken = async (
  token: string | null,
  tokenId: number
): Promise<any> => {
  const headers = getAuthHeader(token || "");
  const result = await axios.get(
    `${config.BE_URL}/admin/tokens/${tokenId}/render`,
    {
      headers,
    }
  );
  return result.data;
};
