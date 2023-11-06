import settings from "@/settings";
import DomainApi from "@/domain/_shared/api/domain-api";

const formats = {
  json: { name: "json", path: "", headers: { "Content-Type": "application/json" } },
  tsv: { name: "tsv", path: "/tsv", headers: { "Content-Type": "text/tab-separated-values" } },
};

function validateFormat(format) {
  if (!formats[format]) {
    throw new Error(`Invalid format: ${format}`);
  }
}

export default class ImagesApi extends DomainApi {
  feedUrl = `${settings.urls.images}`;

  constructor() {
    super("images");
  }

  /**
   * Uploads images data.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadImages(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/images${formats[format].path ?? ""}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }
}
