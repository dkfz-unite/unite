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

async function searchGenes(id, criteria){
  let url = `${donorUrl}/${id}/genes`;
  return await client.post(url, criteria);
}

async function searchVariants(id, type, criteria){
  let url = `${donorUrl}/${id}/variants/${type}`;
  return await client.post(url, criteria);
}

async function getVariantsProfile(id, criteria){
  let url = `${donorUrl}/${id}/variants-profile`;
  return await client.post(url, criteria);
}

export default {
  get,
  searchImages,
  searchSpecimens,
  searchGenes,
  searchVariants,
  getVariantsProfile
}