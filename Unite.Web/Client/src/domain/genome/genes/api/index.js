import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const genesurl = `${settings.urls.composer}/api/genes`;
const genesStatsUrl = `${settings.urls.composer}/api/genes/stats`;
const genesDataUrl = `${settings.urls.composer}/api/genes/data`;

export async function search(criteria) {
  let url = genesurl;
  return await client.post(url, criteria);
}

export async function stats(criteria) {
  let url = genesStatsUrl;
  return await client.post(url, criteria);
}

export async function data(data, criteria) {
  let url = genesDataUrl;
  let model = { data: data, criteria: criteria };
  return await client.post(url, model, { responseType: "blob" });
}

export default {
  search,
  stats,
  data
}