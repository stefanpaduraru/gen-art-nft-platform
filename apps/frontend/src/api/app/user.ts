import axios from "axios";
import config from "../../config/config";
import { ExtendedUser, Artist } from "../../types/user";

type AuthenticationData = {
  token: string;
};
export const authenticate = async (data: AuthenticationData): Promise<any> => {
  const result = await axios.post(`${config.BE_URL}/users/authenticate`, data);

  return result.data;
};

export const fetchUserDetails = async (
  address: string
): Promise<ExtendedUser> => {
  const result = await axios.get(`${config.BE_URL}/users/${address}`);
  return result.data as ExtendedUser;
};

export const updateUserBio = async (
  address: string,
  name?: string,
  bio?: string
): Promise<ExtendedUser> => {
  const data = { name, bio };
  const result = await axios.post(`${config.BE_URL}/users/${address}`, data);
  return result.data as ExtendedUser;
};

export const fetchMintoriaArtists = async (): Promise<Artist[]> => {
  const result = await axios.get(`${config.BE_URL}/users/artists`);
  return result.data as Artist[];
};
