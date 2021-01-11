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
        var url = this.#donorUrl + "?id=" + id;
        return await apiClient.get(url);
    }
}

export default new DonorsApiClient();