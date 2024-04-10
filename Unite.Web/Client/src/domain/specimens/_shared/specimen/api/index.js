import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const specimenUrl = `${settings.urls.composer}/specimen`;
const specimensFeedUrl = `${settings.urls.specimens}`;

async function get(id){
  let url = `${specimenUrl}/${id}`;
  return await client.get(url);
}

async function remove(id){
  let url = `${specimensFeedUrl}/specimens/${id}`;
  return await client.delete(url);
}

async function searchGenes(id, criteria){
  let url = `${specimenUrl}/${id}/genes`;
  return await client.post(url, criteria);
}

async function searchVariants(id, type, criteria){
  let url = `${specimenUrl}/${id}/variants/${type}`;
  return await client.post(url, criteria);
}

async function searchDrugs(id){
  let url = `${specimenUrl}/${id}/drugs`;
  return await client.post(url, null);
}

async function uploadDrugs(data){
  let url = `${specimensFeedUrl}/drugs`;
  return await client.post(url, data);
}

async function getProfile(id, criteria){
  let url = `${specimenUrl}/${id}/profile`;
  return await await client.post(url, criteria);
}

async function downloadData(id, data){
  let url = `${specimenUrl}/${id}/data`;
  let model = { data: data };
  return await client.post(url, model, { responseType: 'blob' });
}

export default {
  get,
  remove,
  searchGenes,
  searchVariants,
  searchDrugs,
  uploadDrugs,
  getProfile,
  downloadData
}
