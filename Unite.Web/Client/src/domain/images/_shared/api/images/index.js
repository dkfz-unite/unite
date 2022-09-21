import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const imagesUrl = `${settings.urls.composer}/api/images`;

async function search(type, criteria) {
  let url = `${imagesUrl}/${type}`;
  return await client.post(url, criteria);
}

export default {
  search
}