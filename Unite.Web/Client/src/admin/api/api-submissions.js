import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings.js";

const client = new ApiClient();
const submissionsUrl = `${settings.urls.composer}/admin/submissions`;

export async function get() {
  const url = `${submissionsUrl}`;
  return await client.get(url);
}

export async function approve(id) {
  const url = `${submissionsUrl}/${id}/approve`;
  return await client.post(url);
}

export async function reject(id, reason) {
  const url = `${submissionsUrl}/${id}/reject`;
  const data = { reason: reason };
  return await client.post(url, data);
}

export default {
  get,
  approve,
  reject
}
