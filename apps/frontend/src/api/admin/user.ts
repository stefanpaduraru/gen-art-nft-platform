import axios from "axios";
import config from "../../config/config";
import { AdminUser, User } from "../../types/user";
import { getAuthHeader } from "../../util/api";

export const fetchUserList = async (token: string | null): Promise<User[]> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(`${config.BE_URL}/admin/users/`, {
    headers,
  });
  return result.data as User[];
};

export const fetchAdminUserDetails = async (
  id: number,
  token: string | null
): Promise<AdminUser> => {
  const headers = getAuthHeader(token);
  const result = await axios.get(`${config.BE_URL}/admin/users/${id}`, {
    headers,
  });
  return result.data as AdminUser;
};
