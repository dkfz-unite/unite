import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const imagesUrl = `${settings.urls.composer}/api/images`;

async function search(type, criteria) {
  let url = `${imagesUrl}/${type}`;
  return await client.post(url, criteria);
}

async function stats(type, criteria) {
  let url = `${imagesUrl}/${type}/stats`;
  return await client.post(url, criteria);
}

async function data(type, data, criteria) {
  let url = `${imagesUrl}/${type}/data`;
  let model = { data: data, criteria: criteria };
  return await client.post(url, model, { responseType: 'blob' });
}

export default {
  search,
  stats,
  data
}