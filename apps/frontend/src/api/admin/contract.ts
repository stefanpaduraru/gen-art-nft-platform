import axios from "axios";
import config from "../../config/config";
import { AdminContract, Contract } from "../../types/contract";
import { getAuthHeader } from "../../util/api";

export const fetchContractList = async (
  token: string | null
): Promise<Contract[]> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(`${config.BE_URL}/admin/contracts/`, {
    headers,
  });
  return result.data as Contract[];
};

export const fetchContractDetails = async (
  id: string,
  token: string | null
): Promise<AdminContract> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(`${config.BE_URL}/admin/contracts/${id}`, {
    headers,
  });
  return result.data as AdminContract;
};
