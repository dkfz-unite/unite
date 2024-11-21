import settings from "@/settings";
import ModelsApi from "@/domain/_shared/entries/api";
import Settings from "../settings";

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
   * get donor submission json document.
   * @param {string} format id to search 
   * @returns {Document} json document
   */
  async getDonorSubmissionDocument(id, type) {

    var url = `${this.feedUrl}/entries/${id}`;

    if(type == "DON_TRT") {
      url = `${this.feedUrl}/treatments/${id}`;
    }

    return await this.client.get(url);
  }
}
