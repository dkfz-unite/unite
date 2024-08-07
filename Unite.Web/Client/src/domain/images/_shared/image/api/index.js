import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const imageUrl = `${settings.urls.composer}/image`;
const imagesFeedUrl = `${settings.urls.images}`;

async function get(id){
  let url = `${imageUrl}/${id}`;
  return await client.get(url);
}

async function remove(id){
  let url = `${imagesFeedUrl}/entry/${id}`;
  return await client.delete(url);
}

async function searchGenes(id, sampleId, criteria){
  let url = `${imageUrl}/${id}/genes/${sampleId}`;
  return await client.post(url, criteria);
}

async function searchVariants(id, sampleId, type, criteria){
  let url = `${imageUrl}/${id}/variants/${sampleId}/${type}`;
  return await client.post(url, criteria);
}

async function getSamples(id) {
  let url = `${imageUrl}/${id}/samples`;
  return await client.get(url);
}

async function getProfile(id, sampleId, criteria){
  let url = `${imageUrl}/${id}/profile/${sampleId}`;
  return await await client.post(url, criteria);
}

async function downloadData(id, data) {
  let url = `${imageUrl}/${id}/data`;
  let model = { data: data };
  return await client.post(url, model, { responseType: 'blob' });
}

export default {
  get,
  remove,
  searchGenes,
  searchVariants,
  getSamples,
  getProfile,
  downloadData
}