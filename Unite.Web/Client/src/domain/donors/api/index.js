import ApiClient from "@/_shared/api/api-client.js";
import settings from "@/settings.js";

const client = new ApiClient();
const domainUrl = `${settings.urls.composer}/donors`;

export async function search(criteria) {
  let url = domainUrl;
  return await client.post(url, criteria);
}

export async function stats(criteria) {
  let url = `${domainUrl}/stats`;
  return await client.post(url, criteria);
}

export async function data(data, criteria) {
  let url = `${domainUrl}/data`;
  let model = { data: data, criteria: criteria };
  return await client.post(url, model, { responseType: "blob" });
}

export default {
  search,
  stats,
  data
}