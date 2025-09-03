export const getAuthHeader = (token: string | null) => ({
  Authorization: token ? `Basic ${token}` : "",
});
