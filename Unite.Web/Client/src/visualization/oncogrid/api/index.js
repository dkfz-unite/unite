import settings from "../../../settings";
import ApiClient from "../../../_shared/api/api-client";

const client = new ApiClient();
const oncogridUrl = `${settings.baseUrl}/oncogrid`;

async function search(criteria) {
    var url = oncogridUrl;
    return await client.post(url, criteria);
}

export default {
    search
}