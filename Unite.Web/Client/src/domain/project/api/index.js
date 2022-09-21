import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const projectUrl = `${settings.urls.composer}/api/data/project`;

export async function get(id) {
    const url = `${projectUrl}/${id}`;
    return await client.get(url);
}

export async function update(project) {
    const url = `${projectUrl}/${project.id}`;
    return await client.put(url, project);
}

export default {
    get,
    update
}
