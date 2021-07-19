import settings from '@/settings.js';
import apiClient from "./api.client.js";

class DonorsApiClient{
    #donorsUrl = settings.baseUrl + "/donors";
    #donorUrl = settings.baseUrl + "/donor";

    async search(criteria){
        var url = this.#donorsUrl;
        return await apiClient.post(url, criteria);
    }

    async get(id){
        var url = `${this.#donorUrl}/${id}`;
        return await apiClient.get(url);
    }

    async searchMutations(id, criteria){
        let url = `${this.#donorUrl}/${id}/mutations`;
        return await apiClient.post(url, criteria);
    }

    async searchSpecimens(id, criteria){
        let url = `${this.#donorUrl}/${id}/specimens`;
        return await apiClient.post(url, criteria);
    }
}

export default new DonorsApiClient();