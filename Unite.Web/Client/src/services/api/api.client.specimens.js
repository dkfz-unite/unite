import settings from '@/settings.js';
import apiClient from "./api.client.js";

class SpecimensApiClient{
    #specimensUrl = settings.baseUrl + "/specimens";
    #specimenUrl = settings.baseUrl + "/specimen";

    async get(id){
        let url = `${this.#specimenUrl}/${id}`;
        return await apiClient.get(url);
    }

    async getGenes(id, criteria){
        let url = `${this.#specimenUrl}/${id}/genes`;
        return await apiClient.post(url, criteria);
    }

    async getMutations(id, criteria){
        let url = `${this.#specimenUrl}/${id}/mutations`;
        return await apiClient.post(url, criteria);
    }

    async search(type, criteria){
        let url = `${this.#specimensUrl}/${type}`;
        return await apiClient.post(url, criteria);
    }
}

export default new SpecimensApiClient();