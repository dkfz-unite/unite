import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const donorsUrl = `${settings.urls.composer}/api/donors`;

export async function search(criteria) {
  let url = donorsUrl;
  return await client.post(url, criteria);
}

export default {
  search
}