import settings from '@/settings.js';
import apiClient from "./api.client.js";

class DonorsApiClient{
    #donorsUrl = settings.baseUrl + "/donors";
    #donorUrl = settings.baseUrl + "/donor";

    async get(id){
        let url = `${this.#donorUrl}/${id}`;
        return await apiClient.get(url);
    }

    async getMutations(id, criteria){
        let url = `${this.#donorUrl}/${id}/mutations`;
        return await apiClient.post(url, criteria);
    }

    async getSpecimens(id, criteria){
        let url = `${this.#donorUrl}/${id}/specimens`;
        return await apiClient.post(url, criteria);
    }

    async search(criteria){
        let url = this.#donorsUrl;
        return await apiClient.post(url, criteria);
    }
}

export default new DonorsApiClient();