import axios from "axios";
import config from "../../config/config";
import {} from "../../types/contract";
import { NumbersResponse, StatusResponse } from "../../types/status";
import { getAuthHeader } from "../../util/api";

export type StatusFrequency = "15m" | "30m" | "24h";

export const fetchStatus = async (
  frequency: StatusFrequency,
  token: string | null
): Promise<StatusResponse> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(
    `${config.BE_URL}/admin/status?frequency=${frequency}`,
    {
      headers,
    }
  );
  return result.data as StatusResponse;
};

export const fetchStats = async (
  token: string | null
): Promise<NumbersResponse> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(`${config.BE_URL}/admin/status/stats`, {
    headers,
  });
  return result.data as NumbersResponse;
};
