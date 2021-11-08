import ApiClient from "../../../../_shared/api/api-client";
import settings from "../../../../settings";

const client = new ApiClient();
const mutationUrl = `${settings.baseUrl}/mutation`;

async function get(id){
  let url = `${mutationUrl}/${id}`;
  return await client.get(url);
}

async function searchDonors(id, criteria){
  let url = `${mutationUrl}/${id}/donors`;
  return await client.post(url, criteria);
}

export default {
  get,
  searchDonors
}