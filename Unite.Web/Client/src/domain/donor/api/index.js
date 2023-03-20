import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const donorUrl = `${settings.urls.composer}/api/donor`;

async function get(id){
  let url = `${donorUrl}/${id}`;
  return await client.get(url);
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

async function getSamples(id) {
  let url = `${donorUrl}/${id}/samples`;
  return await client.get(url);
}

async function getProfile(id, sampleId, criteria){
  let url = `${donorUrl}/${id}/profile/${sampleId}`;
  return await await client.post(url, criteria);
}

export default {
  get,
  searchImages,
  searchSpecimens,
  searchGenes,
  searchVariants,
  getSamples,
  getProfile
}