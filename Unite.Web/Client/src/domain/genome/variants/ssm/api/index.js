import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const variantUrl = `${settings.urls.composer}/api/variant`;

async function get(id){
  let url = `${variantUrl}/${id}`;
  return await client.get(url);
}

async function searchDonors(id, criteria){
  let url = `${variantUrl}/${id}/donors`;
  return await client.post(url, criteria);
}

export default {
  get,
  searchDonors
}