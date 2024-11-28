import settings from "@/settings";
import ModelsApi from "@/domain/_shared/entries/api";
import Settings from "../settings";
import SubmissionType from "../models/enums/submission-type";

const formats = {
  json: { name: "json", path: "", headers: { "Content-Type": "application/json" } },
  tsv: { name: "tsv", path: "/tsv", headers: { "Content-Type": "text/tab-separated-values" } },
};

function validateFormat(format) {
  if (!formats[format]) {
    throw new Error(`Invalid format: ${format}`);
  }
}

export default class DonorsApi extends ModelsApi {
  feedUrl = `${settings.urls.donors}`;

  constructor() {
    super(Settings.domain);
  }

  /**
   * Uploads donors data.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadDonors(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/entries${formats[format].path}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads treatments data.
   * @param {Object} data data to upload. 
   * @param {"json"|"tsv"} format data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadTreatments(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/treatments${formats[format].path}`;
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

    if (type == SubmissionType.DON)
      url = `${this.feedUrl}/entries/${id}`;
    else if (type == SubmissionType.DON_TRT)
      url = `${this.feedUrl}/treatments/${id}`;
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}
