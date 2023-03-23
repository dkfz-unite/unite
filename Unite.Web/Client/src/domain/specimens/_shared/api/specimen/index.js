import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const specimenUrl = `${settings.urls.composer}/api/specimen`;
const specimensFeedUrl = `${settings.urls.specimens}/api`;

async function get(id){
  let url = `${specimenUrl}/${id}`;
  return await client.get(url);
}

async function searchGenes(id, sampleId, criteria){
  let url = `${specimenUrl}/${id}/genes/${sampleId}`;
  return await client.post(url, criteria);
}

async function searchVariants(id, sampleId, type, criteria){
  let url = `${specimenUrl}/${id}/variants/${sampleId}/${type}`;
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

async function getSamples(id) {
  let url = `${specimenUrl}/${id}/samples`;
  return await client.get(url);
}

async function getProfile(id, sampleId, criteria){
  let url = `${specimenUrl}/${id}/profile/${sampleId}`;
  return await await client.post(url, criteria);
}

export default {
  get,
  searchGenes,
  searchVariants,
  searchDrugs,
  uploadDrugs,
  getSamples,
  getProfile
}