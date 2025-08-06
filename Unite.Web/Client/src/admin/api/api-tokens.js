import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings.js";

const client = new ApiClient();
const tokensUrl = `${settings.urls.identity}/tokens`;
const tokenUrl = `${settings.urls.identity}/token`;

export async function get() {
  const url = tokensUrl;
  return await client.get(url);
}

export async function addToken(token) {
  const url = `${tokenUrl}`;
  return await client.post(url,token);
}

export async function extendToken(id, token) {
  const url = `${tokenUrl}/${id}`;
  return await client.put(url, token);
}

export async function revokeToken(id) {
  const url = `${tokenUrl}/${id}/revoke`;
  return await client.put(url);
}

export async function deleteToken(id) {
  const url = `${tokenUrl}/${id}`;
  return await client.delete(url);
}

export default {
  get,
  addToken,
  extendToken,
  revokeToken,
  deleteToken
}
