export default function getAuthHeader(token: string) {
  return { Authorization: "Bearer " + token };
}
