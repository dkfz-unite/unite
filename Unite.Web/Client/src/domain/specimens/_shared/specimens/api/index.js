import ModelsApi from "@/domain/_shared/entries/api";
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

export default class SpecimensApi extends ModelsApi {
  feedUrl = `${settings.urls.specimens}`;

  constructor(type) {
    super(`specimens/${type}`);
  }

  /**
   * Uploads materials data in tsv format.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadMaterials(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/entries/material${formats[format].path}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads cell lines data in tsv format.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadLines(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/entries/line${formats[format].path}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads organoids data in tsv format.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadOrganoids(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/entries/organoid${formats[format].path}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads xenografts data in tsv format.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadXenografts(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}entries/xenograft${formats[format].path}`;
    const body = data;
    const config = { headers: formats[format].headers };

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

    const url = `${this.feedUrl}/interventions${formats[format].path}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads drugs screening data.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadDrugs(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/analysis/drugs${formats[format].path}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }

   /**
   * get Specimen submission - materials, lines, organoids, intervensions, and drugs json document.
   * @param {string} format id to search 
   * @returns {Document} json document
   */
   async getSpecimenSubmissionDocument(id, type) {

    switch(type) 
    {
      case "MAT":
        var url = `${this.feedUrl}/entries/material/${id}`;
      case "LNE":
        url = `${this.feedUrl}/entries/line/${id}`;
      case "ORG":
        url = `${this.feedUrl}/entries/organoid/${id}`;
      case "XEN":
        url = `${this.feedUrl}entries/xenograft/${id}`;
      case "SPE_INT":
        url = `${this.feedUrl}entries/interventions/${id}`;
      case "SPE_DRG":
        url = `${this.feedUrl}/analysis/drugs${formats[format].path}`;
        break;
      default:
        break;
    }
    
    return await this.client.get(url);
  }
}
