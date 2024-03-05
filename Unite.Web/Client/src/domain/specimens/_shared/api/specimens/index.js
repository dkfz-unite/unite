import DomainApi from "@/domain/_shared/api/domain-api";
import settings from "@/settings";

const formats = {
  json: { name: "json", path: "", headers: { "Content-Type": "application/json" } },
  tsv: { name: "tsv", path: "/tsv", headers: { "Content-Type": "text/tab-separated-values" } },
};

function validateFormat(format) {
  if (!formats[format]) {
    throw new Error(`Invalid format: ${format}`);
  }
}

export default class SpecimensApi extends DomainApi {
  feedUrl = `${settings.urls.specimens}`;

  constructor(type) {
    super(`specimens/${type}`);
  }

  /**
   * Uploads specimens data in json format.
   * @param {Object} data data to upload.
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadSpecimens(data) {
    const url = `${this.feedUrl}/specimens`;
    const body = data;
    const config = { headers: formats.json.headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads tissues data in tsv format.
   * @param {Object} data data to upload.
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadTissues(data) {
    const url = `${this.feedUrl}/materials/tsv`;
    const body = data;
    const config = { headers: formats.tsv.headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads cells data in tsv format.
   * @param {Object} data data to upload.
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadCells(data) {
    const url = `${this.feedUrl}/lines/tsv`;
    const body = data;
    const config = { headers: formats.tsv.headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads organoids data in tsv format.
   * @param {Object} data data to upload.
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadOrganoids(data) {
    const url = `${this.feedUrl}/organoids/tsv`;
    const body = data;
    const config = { headers: formats.tsv.headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads xenografts data in tsv format.
   * @param {Object} data data to upload.
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadXenografts(data) {
    const url = `${this.feedUrl}/xenografts/tsv`;
    const body = data;
    const config = { headers: formats.tsv.headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads interventions data.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */ 
  async uploadInterventions(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/interventions${formats[format].path ?? ""}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads drugs data.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadDrugs(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/drugs${formats[format].path ?? ""}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }
}
