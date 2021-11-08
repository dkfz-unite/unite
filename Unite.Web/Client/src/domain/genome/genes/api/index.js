import ApiClient from "../../../../_shared/api/api-client";
import settings from '../../../../settings';

const client = new ApiClient();
const genesurl = `${settings.baseUrl}/genes`;

export async function search(criteria) {
  let url = genesurl;
  return await client.post(url, criteria);
}

export default {
  search
}