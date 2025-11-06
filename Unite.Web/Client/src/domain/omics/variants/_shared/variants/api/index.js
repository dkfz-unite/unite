import settings from "@/settings";
import ModelsApi from "@/domain/_shared/entries/api";
import SubmissionType from "@/domain/submissions/models/enums/submission-type-omics";
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
  feedUrl = `${settings.urls.omics}`;

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
}
