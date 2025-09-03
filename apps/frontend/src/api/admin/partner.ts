import axios from "axios";
import config from "../../config/config";
import { Partner } from "../../types/partner";
import { getAuthHeader } from "../../util/api";

export const fetchPartnerList = async (
  token: string | null
): Promise<Partner[]> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(`${config.BE_URL}/admin/partners/`, {
    headers,
  });
  return result.data as Partner[];
};

export const fetchPartnerDetails = async (
  id: string,
  token: string | null
): Promise<Partner> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(`${config.BE_URL}/admin/partners/${id}`, {
    headers,
  });
  return result.data as Partner;
};
