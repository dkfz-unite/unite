import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const donorUrl = `${settings.urls.composer}/donor`;
const donorsFeedUrl = `${settings.urls.donors}`;

async function get(id){
  let url = `${donorUrl}/${id}`;
  return await client.get(url);
}

async function remove(id){
  let url = `${donorsFeedUrl}/entry/${id}`;
  return await client.delete(url);
}

async function searchImages(id, type, criteria){
  let url = `${donorUrl}/${id}/images/${type}`;
  return await client.post(url, criteria);
}

async function searchSpecimens(id, criteria){
  let url = `${donorUrl}/${id}/specimens`;
  return await client.post(url, criteria);
}

async function searchGenes(id, sampleId, criteria){
  let url = `${donorUrl}/${id}/genes/${sampleId}`;
  return await client.post(url, criteria);
}

async function searchVariants(id, sampleId, type, criteria){
  let url = `${donorUrl}/${id}/variants/${sampleId}/${type}`;
  return await client.post(url, criteria);
}

async function getProfile(id, sampleId, criteria){
  let url = `${donorUrl}/${id}/profile/${sampleId}`;
  return await await client.post(url, criteria);
}

async function downloadData(id, data) {
  let url = `${donorUrl}/${id}/data`;
  let model = { data: data };
  return await client.post(url, model, { responseType: 'blob' });
}

export default {
  get,
  remove,
  searchImages,
  searchSpecimens,
  searchGenes,
  searchVariants,
  getProfile,
  downloadData
}