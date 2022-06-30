import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

const client = new ApiClient();
const projectsUrl = `${settings.baseUrl}/data/projects`;
const projectUrl = `${settings.baseUrl}/data/project`;

export async function search() {
    const url = projectsUrl;
    return await client.get(url);
}

export async function update(project) {
    const url = `${projectUrl}/${project.id}`;
    return await client.put(url, project);
}

export default {
    search,
    update
}
