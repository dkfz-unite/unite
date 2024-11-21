import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const submissionsUrl = `${settings.urls.composer}/data/submissions`;

export async function findTaskStatus(id) {
    const url = `${submissionsUrl}/${id}`;
    return await client.get(url);
}

export default {
    findTaskStatus
}
