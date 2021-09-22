import settings from '@/settings.js';
import apiClient from "../api.client.js";

export default class LolliplotApiClient {
    #lolliplotUrl = settings.baseUrl + "/lolliplot";

    /**
     * Retrieves protein plot data for given transcript
     * @param {Number} id  
     */
    async get(id) {
        var url = `${this.#lolliplotUrl}/transcript/${id}`;
        return await apiClient.get(url);
    }

    /**
     * Retrieves protein coding transcripts affected by any mutation in given gene
     * @param {Number} id Gene id
     */
    async getGeneTranscripts(id) {
        var url = `${this.#lolliplotUrl}/gene/${id}/transcripts`;
        return await apiClient.get(url);
    }

    /**
     * Retrieves protein coding transcripts affected by given mutation
     * @param {Number} id Mutation id
     */
     async getMutationTranscripts(id) {
        var url = `${this.#lolliplotUrl}/mutation/${id}/transcripts`;
        return await apiClient.get(url);
    }
}