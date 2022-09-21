import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const mutationsUrl = `${settings.urls.composer}/api/mutations`;

export async function search(criteria) {
  let url = mutationsUrl;
  return await client.post(url, criteria);
}

export default {
  search
}