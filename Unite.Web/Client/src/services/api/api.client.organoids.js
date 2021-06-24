import settings from '@/settings.js';
import apiClient from "./api.client.js";

class OrganoidsApiClient{
    #specimensUrl = settings.baseUrl + "/organoids";
    #specimenUrl = settings.baseUrl + "/organoid";

    async search(criteria){
        var url = this.#specimensUrl;
        return await apiClient.post(url, criteria);
    }

    async get(id){
        var url = this.#specimenUrl + "?id=" + id;
        return await apiClient.get(url);
    }
}

export default new OrganoidsApiClient();