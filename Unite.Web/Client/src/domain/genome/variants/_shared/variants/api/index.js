import settings from "@/settings";
import ModelsApi from "@/domain/_shared/entries/api";
import SubmissionType from "../models/enums/submission-type";
import VariantType from "../models/enums/variant-type";

const formats = {
  json: { name: "json", path: "", headers: { "Content-Type": "application/json" } },
  tsv: { name: "tsv", path: "/tsv", headers: { "Content-Type": "text/tab-separated-values" } },
};

function validateFormat(format) {
  if (!formats[format]) {
    throw new Error(`Invalid format: ${format}`);
  }
}

export default class VariantsApi extends ModelsApi {
  type = null;
  feedUrl = `${settings.urls.genome}`;

  constructor(type) {
    super(`${type}s`);
    this.type = type;
  }

  /**
   * Uploads variants data.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadVariants(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/dna/analysis/${this.type}s${formats[format].path}`;
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

    if (type == SubmissionType.DNA_SSM)
      url = `${this.feedUrl}/dna/analysis/${VariantType.SSM}/${id}`;
    else if (type == SubmissionType.DNA_CNV)
      url = `${this.feedUrl}/dna/analysis/${VariantType.CNV}/${id}`;
    else if (type == SubmissionType.DNA_SV)
      url = `${this.feedUrl}/dna/analysis/${VariantType.SV}/${id}`;
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}
