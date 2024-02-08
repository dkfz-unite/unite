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
    super("images"); // domain <- settings
  }

  /**
   * Uploads images data.
   * @param {Object} data data to upload.
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadImages(data) {
    const url = `${this.feedUrl}/images${formats.json.path}`;
    const body = data;
    const config = { headers: formats.json.headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads MRI images data.
   * @param {Object} data data to upload.
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadMris(data) {
    const url = `${this.feedUrl}/mris${formats.tsv.path}`;
    const body = data;
    const config = { headers: formats.tsv.headers };
    
    return this.client.post(url, body, config);
  }
}
