import DomainApi from "@/domain/_shared/api/domain-api";
import settings from "@/settings";

const formats = {
  json: { name: "json", path: "", headers: { "Content-Type": "application/json" } },
  tsv: { name: "tsv", path: "/tsv", headers: { "Content-Type": "text/tab-separated-values" } },
};

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
   * Uploads tissues data.
   * @param {Object} data data to upload.
   * @param {"json"|"tsv"} [format] data format (default: "json").
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadTissues(data) {
    const url = `${this.feedUrl}/tissues/tsv`;
    const body = data;
    const config = { headers: formats.tsv.headers };

    return this.client.post(url, body, config);
  }
}
