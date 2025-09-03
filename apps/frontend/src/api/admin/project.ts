import axios from "axios";
import config from "../../config/config";
import { ExtendedProject, Project } from "../../types/project";
import { Meta } from "../../types/meta";
import { Token } from "../../types/token";
import getAuthHeader from "../app/common";
import { TransferStateTypes } from "../../types/transferRequest";

export const fetchProjectList = async (
  token: string | null
): Promise<ExtendedProject[]> => {
  const headers = getAuthHeader(token || "");
  const result = await axios.get(`${config.BE_URL}/admin/projects/`, {
    headers,
  });
  return result.data as ExtendedProject[];
};

export type TokenResponse = { meta: Meta; tokens: Token[] };

export const updateAdminProject = async (
  id: number | string,
  data: Partial<Project>,
  token: string | null
): Promise<Project | undefined> => {
  const headers = getAuthHeader(token || "");
  try {
    const result = await axios.post(
      `${config.BE_URL}/admin/projects/${id}`,
      data,
      {
        headers,
      }
    );
    return result.data as Project;
  } catch (e) {
    console.log("Error updating project", e);
  }
  return;
};

export const createAdminProject = async (
  data: Partial<Project>,
  token: string
): Promise<Project | undefined> => {
  const headers = getAuthHeader(token || "");
  try {
    const result = await axios.post(`${config.BE_URL}/admin/projects/`, data, {
      headers,
    });
    return result.data as Project;
  } catch (e) {
    console.log("Error updating project", e);
  }
  return;
};

export const fetchAdminProjectDetails = async (
  id: string,
  token: string | null
): Promise<ExtendedProject> => {
  const headers = getAuthHeader(token || "");
  const result = await axios.get(`${config.BE_URL}/admin/projects/${id}/`, {
    headers,
  });
  return result.data as ExtendedProject;
};

export const adminAddProjectMainnetId = async (
  chainId: number,
  projectId: number,
  token: string
): Promise<void> => {
  const headers = getAuthHeader(token);
  await axios.post(
    `${config.BE_URL}/admin/projects/${projectId}/add-mainnet-id/`,
    { chainId },
    {
      headers,
    }
  );
  return;
};

export const adminAddProjectTestnetId = async (
  chainId: number,
  projectId: number,
  token: string
): Promise<void> => {
  const headers = getAuthHeader(token);
  await axios.post(
    `${config.BE_URL}/admin/projects/${projectId}/add-testnet-id/`,
    { chainId },
    {
      headers,
    }
  );
  return;
};

export const updateTransferRequest = async (
  projectId: number,
  requestId: number,
  state: TransferStateTypes,
  comments: string,
  token: string
): Promise<void> => {
  const headers = getAuthHeader(token);
  await axios.post(
    `${config.BE_URL}/admin/projects/${projectId}/transfer-request/${requestId}`,
    { comments, state },
    {
      headers,
    }
  );
  return;
};
