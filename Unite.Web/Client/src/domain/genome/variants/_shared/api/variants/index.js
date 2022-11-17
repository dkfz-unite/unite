import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const variantsUrl = `${settings.urls.composer}/api/variants`;

export async function search(type, criteria) {
  let url = `${variantsUrl}/${type}`;
  return await client.post(url, criteria);
}

export default {
  search
}