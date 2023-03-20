import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const imageUrl = `${settings.urls.composer}/api/image`;

async function get(id){
  let url = `${imageUrl}/${id}`;
  return await client.get(url);
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

export default {
  get,
  searchGenes,
  searchVariants,
  getSamples,
  getProfile
}