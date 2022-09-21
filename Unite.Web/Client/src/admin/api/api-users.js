import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings.js";

const client = new ApiClient();
const usersUrl = `${settings.urls.composer}/api/admin/users`;
const userUrl = `${settings.urls.composer}/api/admin/user`;

export async function search() {
    const url = usersUrl;
    return await client.get(url);
}

export async function check(email) {
    const url = `${userUrl}?email=${email}`;
    return await client.get(url);
}

export async function get(id) {
    let url = `${userUrl}/${id}`;
    return await client.get(url);
}

export async function create(user) {
    const url = userUrl;
    return await client.post(url, user);
}

export async function update(user) {
    const url = userUrl;
    return await client.put(url, user);
}

export async function remove(id) {
    const url = `${userUrl}/${id}`;
    return await client.delete(url);
}

export default {
  search,
  check,
  get,
  create,
  update,
  remove
}
