import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const composerUrl = `${settings.urls.composer}`;

async function get(id, type){
  let url = `${composerUrl}/${type}/${id}`;
  return await client.get(url);
}

async function searchDonors(id, type, criteria){
  let url = `${composerUrl}/${type}/${id}/donors`;
  return await client.post(url, criteria);
}

async function downloadData(id, type, data){
  let url = `${composerUrl}/${type}/${id}/data`;
  var model = { data: data };
  return await client.post(url, model, { responseType: "blob" });
}

export default {
  get,
  searchDonors,
  downloadData
}