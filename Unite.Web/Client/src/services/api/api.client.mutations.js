import settings from '@/settings.js';
import apiClient from "./api.client.js";

class MutationsApiClient{
    #mutationsUrl = settings.baseUrl + "/mutations";
    #mutationUrl = settings.baseUrl + "/mutation";

    async search(criteria){
        var url = this.#mutationsUrl;
        return await apiClient.post(url, criteria);
    }

    async get(id){
        var url = this.#mutationUrl + "?id=" + id;
        return await apiClient.get(url);
    }
}

export default new MutationsApiClient();