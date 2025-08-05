import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings.js";

const client = new ApiClient();
const workersUrl = `${settings.urls.identity}/tokens`;
const workerUrl = `${settings.urls.identity}/token`;

export async function get() {
  const url = workersUrl;
  return await client.get(url);
}

export async function addToken(token) {
  const url = `${workerUrl}`;
  return await client.post(url,token);
}

export async function extendToken(id, token) {
  const url = `${workerUrl}/${id}/token`;
  return await client.put(url, token);
}

export async function revokeToken(id) {
  const url = `${workerUrl}/${id}/revoke`;
  return await client.put(url);
}

export async function deleteToken(id) {
  const url = `${workerUrl}/${id}`;
  return await client.delete(url);
}

export default {
  get,
  addToken,
  extendToken,
  revokeToken,
  deleteToken
}
