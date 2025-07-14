import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings.js";

const client = new ApiClient();
const workersUrl = `${settings.urls.identity}/workers`;
const workerUrl = `${settings.urls.identity}/worker`;

export async function get() {
  const url = workersUrl;
  return await client.get(url);
}

export async function addWorkerToken(id, token) {
  const url = `${workerUrl}/${id}/token`;
  return await client.post(url, token);
}

export async function updateWorkerPermissions(id, worker) {
  const url = `${workerUrl}/${id}`;
  return await client.post(url, worker);
}

export default {
  get,
  addWorkerToken,
  updateWorkerPermissions
}
