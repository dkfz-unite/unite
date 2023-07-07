import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const specimensUrl = `${settings.urls.composer}/api/specimens`;

async function search(type, criteria) {
  let url = `${specimensUrl}/${type}`;
  return await client.post(url, criteria);
}

async function stats(type, criteria) {
  let url = `${specimensUrl}/${type}/stats`;
  return await client.post(url, criteria);
}

async function data(type, data, criteria) {
  let url = `${specimensUrl}/${type}/data`;
  let model = { data: data, criteria: criteria };
  return await client.post(url, model, { responseType: 'blob' });
}

export default {
  search,
  stats,
  data
}