import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const donorsUrl = `${settings.urls.composer}/donors`;
const donorsStatsUrl = `${donorsUrl}/stats`;
const donorsDataUrl = `${donorsUrl}/data`;

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