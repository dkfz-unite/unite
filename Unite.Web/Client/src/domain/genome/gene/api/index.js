import ApiClient from "../../../../_shared/api/api-client";
import settings from "../../../../settings";

const client = new ApiClient();
const geneUrl = `${settings.baseUrl}/gene`;

async function get(id){
  let url = `${geneUrl}/${id}`;
  return await client.get(url);
}

async function searchDonors(id, criteria){
  let url = `${geneUrl}/${id}/donors`;
  return await client.post(url, criteria);
}

async function searchMutations(id, criteria){
  let url = `${geneUrl}/${id}/mutations`;
  return await client.post(url, criteria);
}

export default {
  get,
  searchDonors,
  searchMutations
}