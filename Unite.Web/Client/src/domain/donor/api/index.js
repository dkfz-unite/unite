import ApiClient from "../../../_shared/api/api-client";
import settings from "../../../settings";

const client = new ApiClient();
const donorUrl = `${settings.baseUrl}/donor`;

async function get(id){
  let url = `${donorUrl}/${id}`;
  return await client.get(url);
}

async function searchSpecimens(id, criteria){
  let url = `${donorUrl}/${id}/specimens`;
  return await client.post(url, criteria);
}

async function searchGenes(id, criteria){
  let url = `${donorUrl}/${id}/genes`;
  return await client.post(url, criteria);
}

async function searchMutations(id, criteria){
  let url = `${donorUrl}/${id}/mutations`;
  return await client.post(url, criteria);
}

export default {
  get,
  searchSpecimens,
  searchGenes,
  searchMutations
}