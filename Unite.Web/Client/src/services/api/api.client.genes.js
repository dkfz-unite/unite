import settings from '@/settings.js';
import apiClient from "./api.client.js";

class GenesApiClient{
    #genesUrl = settings.baseUrl + "/genes";
    #geneUrl = settings.baseUrl + "/gene";

    async get(id){
        let url = `${this.#geneUrl}/${id}`;
        return await apiClient.get(url);
    }

    async getDonors(id, criteria){
        let url = `${this.#geneUrl}/${id}/donors`;
        return await apiClient.post(url, criteria);
    }

    async getMutations(id, criteria){
        let url = `${this.#geneUrl}/${id}/mutations`;
        return await apiClient.post(url, criteria);
    }

    async search(criteria){
        let url = this.#genesUrl;
        return await apiClient.post(url, criteria);
    }
}

export default new GenesApiClient();