import settings from "../../../settings";
import ApiClient from "../../../_shared/api/api-client";

const client = new ApiClient();
const lolliplotUrl = `${settings.baseUrl}/lolliplot`;

/**
 * Retrieves protein plot data for given transcript
 * @param {Number} id  
 */
async function get(id) {
    var url = `${lolliplotUrl}/transcript/${id}`;
    return await client.get(url);
}

/**
 * Retrieves protein coding transcripts affected by any mutation in given gene
 * @param {Number} id Gene id
 */
async function getGeneTranscripts(id) {
    var url = `${lolliplotUrl}/gene/${id}/transcripts`;
    return await client.get(url);
}

/**
 * Retrieves protein coding transcripts affected by given mutation
 * @param {Number} id Mutation id
 */
async function getMutationTranscripts(id) {
    var url = `${lolliplotUrl}/mutation/${id}/transcripts`;
    return await client.get(url);
}

export default {
    get,
    getGeneTranscripts,
    getMutationTranscripts
}