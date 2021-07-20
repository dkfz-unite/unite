import settings from '@/settings.js';
import apiClient from "./api.client.js";

class MutationsApiClient{
    #mutationsUrl = settings.baseUrl + "/mutations";
    #mutationUrl = settings.baseUrl + "/mutation";

    async get(id){
        let url = `${this.#mutationUrl}/${id}`;
        return await apiClient.get(url);
    }

    async getDonors(id, criteria){
        let url = `${this.#mutationUrl}/${id}/donors`;
        return await apiClient.post(url, criteria);
    }

    async search(criteria){
        let url = this.#mutationsUrl;
        return await apiClient.post(url, criteria);
    }
}

export default new MutationsApiClient();