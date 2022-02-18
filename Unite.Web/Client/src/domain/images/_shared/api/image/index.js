import ApiClient from "../../../../../_shared/api/api-client";
import settings from "../../../../../settings";

const client = new ApiClient();
const imageUrl = `${settings.baseUrl}/image`;

async function get(id){
  let url = `${imageUrl}/${id}`;
  return await client.get(url);
}

// async function searchGenes(id, criteria){
//   let url = `${imageUrl}/${id}/genes`;
//   return await client.post(url, criteria);
// }

// async function searchMutations(id, criteria){
//   let url = `${imageUrl}/${id}/mutations`;
//   return await client.post(url, criteria);
// }

export default {
  get,
  // searchGenes,
  // searchMutations
}