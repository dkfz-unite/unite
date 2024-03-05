import ApiClient from "@/_shared/api/api-client";
import settings from "@/settings";

/**
 * Represents an API client for a domain.
 */
export default class ModelsApi {
  /**
   * Relative to composer URL of the domain (e.g. "donors" or "specimens/material" etc.).
   * @type {string}
   */
  url = null;

  /**
   * API client.
   * @type {ApiClient}
   */
  client = null;

  /**
   * Creates a new instance of the DomainApi class.
   * @param {string} domainUrl - Relative to composer URL of the domain (e.g. "donors" or "specimens/material" etc.).
   */
  constructor(domainUrl) {
    this.url = `${settings.urls.composer}/${domainUrl}`;
    this.client = new ApiClient();
  }

  /**
   * Retrieves domain data according to given search criteria.
   * @param {object} criteria - Search criteria.
   * @returns {Promise<object>} - A promise that resolves with the search results.
   */
  async search(criteria) {
    const url = this.url;
    return await this.client.post(url, criteria);
  }

  /**
   * Retrieves domain statistics according to given search criteria.
   * @param {object} criteria - Search criteria.
   * @returns {Promise<object>} - A promise that resolves with the statistics results.
   */
  async loadStats(criteria) {
    const url = `${this.url}/stats`;
    return await this.client.post(url, criteria);
  }

  /**
   * Downloads given domain data matching given search criteria in tsv format.
   * @param {object} data - Data to retrieve.
   * @param {object} criteria - Search criteria.
   * @returns {Promise<Blob>} - A promise that resolves with the retrieved data.
   */
  async downloadData(data, criteria) {
    const url = `${this.url}/data`;
    const body = { data: data, criteria: criteria };
    return await this.client.post(url, body, { responseType: "blob" });
  }
}
