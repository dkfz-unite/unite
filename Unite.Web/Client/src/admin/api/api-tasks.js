import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings.js";

const client = new ApiClient();
const tasksUrl = `${settings.urls.composer}/api/admin/tasks`;

export async function getGeneralStats() {
    const url = `${tasksUrl}/stats`;
    return await client.get(url);
}

export async function getSubmissionStats() {
    const url = `${tasksUrl}/stats/submission`;
    return await client.get(url);
}

export async function getAnnotationStats() {
    const url = `${tasksUrl}/stats/annotation`;
    return await client.get(url);
}

export async function getIndexingStats() {
    const url = `${tasksUrl}/stats/indexing`;
    return await client.get(url);
}

export default {
    getGeneralStats,
    getSubmissionStats,
    getAnnotationStats,
    getIndexingStats
}
