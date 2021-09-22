import settings from '@/settings.js';
import apiClient from "../api.client.js";

class OncoGridApiClient {
    #oncogridUrl = settings.baseUrl + "/oncogrid";

    async search(criteria) {
        var url = this.#oncogridUrl;
        return await apiClient.post(url, criteria);
    }
}

export default new OncoGridApiClient();