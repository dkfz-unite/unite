import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const specimensUrl = `${settings.urls.composer}/api/specimens`;

async function search(type, criteria) {
  let url = `${specimensUrl}/${type}`;
  return await client.post(url, criteria);
}

export default {
  search
}