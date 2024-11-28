import ModelsApi from "@/domain/_shared/entries/api";
import SubmissionType from "../models/enums/submission-type";
import SpecimenType from "../models/enums/specimen-type";
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
   * Get submission document.
   * @param {number|string} id submission id.
   * @param {SubmissionType} type submission type.
   * @returns {Promise<Object>} A promise that resolves with the submission document.
   */
  async getSubmission(id, type) {
    let url = null;

    if (type == SubmissionType.MAT)
      url = `${this.feedUrl}/entries/${SpecimenType.Material}/${id}`;
    else if (type == SubmissionType.LNE)
      url = `${this.feedUrl}/entries/${SpecimenType.Line}/${id}`;
    else if (type == SubmissionType.ORG)
      url = `${this.feedUrl}/entries/${SpecimenType.Organoid}/${id}`;
    else if (type == SubmissionType.XEN)
      url = `${this.feedUrl}/entries/${SpecimenType.Xenograft}/${id}`;
    else if (type == SubmissionType.SPE_INT)
      url = `${this.feedUrl}/interventions/${id}`;
    else if (type == SubmissionType.SPE_DRG)
      url = `${this.feedUrl}/analysis/drugs/${id}`;
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}
