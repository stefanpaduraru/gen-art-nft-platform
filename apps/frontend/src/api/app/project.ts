import axios from "axios";
import config from "../../config/config";
import {
  Project,
  ExtendedProject,
  OptionalProjectMetadata,
  ProjectSettings,
} from "../../types/project";
import { Meta } from "../../types/meta";
import getAuthHeader from "../app/common";
import { Token } from "../../types/token";
import { Network } from "../../types/network";
import { MintoriaGallery } from "../../types/galleries";
import { TransferRequest } from "../../types/transferRequest";

export type AuthAndRecaptcha = {
  Authorization: string;
  ["X-Recaptcha-Response"]?: string;
};
export const fetchProjectsByArtistAddress = async (
  token: string
): Promise<ExtendedProject[]> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(`${config.BE_URL}/projects/my/`, {
    headers,
  });
  return result.data as ExtendedProject[];
};

export const fetchActiveProjects = async (): Promise<Project[]> => {
  const result = await axios.get(`${config.BE_URL}/projects`);
  return result.data as Project[];
};

export const fetchMintoriaProjects = async (
  gallery: MintoriaGallery
): Promise<Project[]> => {
  const result = await axios.get(`${config.BE_URL}/projects/${gallery}`);
  return result.data as Project[];
};

export const fetchProjectDetails = async (
  projectId: number | string,
  gallery: MintoriaGallery
): Promise<Project> => {
  const result = await axios.get(
    `${config.BE_URL}/projects/${gallery}/${projectId}`
  );
  return result.data as Project;
};

export const fetchMyProjectDetails = async (
  projectId: number | string,
  token: string
): Promise<ExtendedProject> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(
    `${config.BE_URL}/projects/my/${projectId}/details`,
    {
      headers: headers,
    }
  );
  return result.data as ExtendedProject;
};

export const fetchMyProjectEdit = async (
  projectId: number | string,
  token: string
): Promise<ExtendedProject> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(
    `${config.BE_URL}/projects/my/${projectId}/edit`,
    {
      headers: headers,
    }
  );
  return result.data as ExtendedProject;
};

export type TokenResponse = { meta: Meta; tokens: Token[] };

export const fetchProjectTokens = async (
  projectId: number | string,
  network: Network,
  gallery: MintoriaGallery,
  currentPage: number | string,
  perPage: number | string
): Promise<TokenResponse> => {
  const result = await axios.get(
    `${config.BE_URL}/projects/${network}/${gallery}/${projectId}/tokens?field=token&order=DESC&perPage=${perPage}&page=${currentPage}`
  );
  return result.data as TokenResponse;
};

export const updateProject = async (
  id: number | string,
  data: Partial<Omit<Project, "metadata">> & {
    metadata?: OptionalProjectMetadata;
  },
  token: string,
  captchaToken?: string
): Promise<ExtendedProject | undefined> => {
  const headers: AuthAndRecaptcha = getAuthHeader(token);
  if (captchaToken) {
    headers["X-Recaptcha-Response"] = captchaToken;
  }
  try {
    const result = await axios.post(`${config.BE_URL}/projects/${id}`, data, {
      headers: headers,
    });
    return result.data as ExtendedProject;
  } catch (e) {
    console.log("Error updating project", e);
  }
  return;
};

export const updateProjectSettings = async (
  id: number | string,
  data: ProjectSettings,
  token: string,
  captchaToken?: string
): Promise<ExtendedProject | undefined> => {
  const headers: AuthAndRecaptcha = getAuthHeader(token);
  if (captchaToken) {
    headers["X-Recaptcha-Response"] = captchaToken;
  }
  try {
    const result = await axios.post(
      `${config.BE_URL}/projects/${id}/settings`,
      data,
      {
        headers: headers,
      }
    );
    return result.data as ExtendedProject;
  } catch (e) {
    console.log("Error updating project", e);
  }
  return;
};

export const createProjectTemplate = async (
  name: string,
  pricePerTokenInWei: string,
  gallery: MintoriaGallery,
  token: string,
  captchaToken?: string
): Promise<ExtendedProject | undefined> => {
  const headers: AuthAndRecaptcha = getAuthHeader(token);
  if (captchaToken) {
    headers["X-Recaptcha-Response"] = captchaToken;
  }

  const data = { name, pricePerTokenInWei, gallery };
  try {
    const result = await axios.post(`${config.BE_URL}/projects/my/new`, data, {
      headers: headers,
    });
    return result.data as ExtendedProject;
  } catch (e) {}
  return;
};

export const submitProjectVote = async (
  id: number | string,
  token: string
): Promise<ExtendedProject | undefined> => {
  const data = { token };
  try {
    const result = await axios.post(
      `${config.BE_URL}/projects/${id}/vote`,
      data
    );
    return result.data as ExtendedProject;
  } catch (e) {}
  return;
};

export const projectRequestTransfer = async (
  id: number | string,
  token: string,
  captchaToken: string
): Promise<TransferRequest | undefined> => {
  const headers: AuthAndRecaptcha = getAuthHeader(token);
  if (captchaToken) {
    headers["X-Recaptcha-Response"] = captchaToken;
  }
  try {
    return axios.post(
      `${config.BE_URL}/projects/${id}/transfer`,
      {},
      {
        headers: headers,
      }
    );
  } catch (e) {
    console.log("Error updating project", e);
  }
  return;
};
