import settings from "@/settings";
import ModelsApi from "@/domain/_shared/entries/api";
import SubmissionType from "../models/enums/submission-type";
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

export default class GenesApi extends ModelsApi {
  feedUrl = `${settings.urls.genome}`;

  constructor() {
    super(Settings.domain);
  }

  /**
   * Uploads bulk transcriptomics data.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadBulk(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/rna/analysis/exps${formats[format].path}`;
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

    if (type == SubmissionType.RNA_EXP)
      url = `${this.feedUrl}/rna/analysis/exp/${id}`;
    else if (type == SubmissionType.RNASC_EXP)
      url = `${this.feedUrl}/rnasc/analysis/exp/${id}`;
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}
