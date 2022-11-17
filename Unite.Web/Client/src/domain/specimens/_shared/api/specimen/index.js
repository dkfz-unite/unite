import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const specimenUrl = `${settings.urls.composer}/api/specimen`;
const specimensFeedUrl = `${settings.urls.specimens}/api`;

async function get(id){
  let url = `${specimenUrl}/${id}`;
  return await client.get(url);
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

export default {
  get,
  searchGenes,
  searchVariants,
  searchDrugs,
  uploadDrugs
}