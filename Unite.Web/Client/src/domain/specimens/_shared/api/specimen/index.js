import ApiClient from "../../../../../_shared/api/api-client";
import settings from "../../../../../settings";

const client = new ApiClient();
const specimenUrl = `${settings.baseUrl}/specimen`;

async function get(id){
  let url = `${specimenUrl}/${id}`;
  return await client.get(url);
}

async function searchGenes(id, criteria){
  let url = `${specimenUrl}/${id}/genes`;
  return await client.post(url, criteria);
}

async function searchMutations(id, criteria){
  let url = `${specimenUrl}/${id}/mutations`;
  return await client.post(url, criteria);
}

export default {
  get,
  searchGenes,
  searchMutations
}