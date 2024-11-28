import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const submissionUrl = `${settings.urls.composer}/data/submission`;

export async function getStatus(id) {
  const url = `${submissionUrl}/${id}/status`;
  return await client.get(url);
}

export default {
  getStatus
}
