import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const donorsUrl = `${settings.urls.composer}/api/donors`;
const donorsStatsUrl = `${settings.urls.composer}/api/donors/stats`;
const donorsDataUrl = `${settings.urls.composer}/api/donors/data`;

export async function search(criteria) {
  let url = donorsUrl;
  return await client.post(url, criteria);
}

export async function stats(criteria) {
  let url = donorsStatsUrl;
  return await client.post(url, criteria);
}

export async function data(data, criteria) {
  let url = donorsDataUrl;
  let model = { data: data, criteria: criteria };
  return await client.post(url, model, { responseType: "blob" });
}

export default {
  search,
  stats,
  data
}