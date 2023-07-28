import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const geneUrl = `${settings.urls.composer}/api/gene`;

async function get(id){
  let url = `${geneUrl}/${id}`;
  return await client.get(url);
}

async function searchDonors(id, criteria){
  let url = `${geneUrl}/${id}/donors`;
  return await client.post(url, criteria);
}

async function searchVariants(id, type, criteria){
  let url = `${geneUrl}/${id}/variants/${type}`;
  return await client.post(url, criteria);
}

async function downloadData(id, data){
  let url = `${geneUrl}/${id}/data`;
  let model = { data: data };
  return await client.post(url, model, { responseType: "blob" });
}

export default {
  get,
  searchDonors,
  searchVariants,
  downloadData
}