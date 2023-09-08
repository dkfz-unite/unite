import settings from '@/settings';
import DomainApi from '@/domain/_shared/api/domain-api';

const formats = {
  json: { name: 'json', path: '', headers: { 'Content-Type': 'multipart/form-data' } },
  tsv: { name: 'tsv', path: 'tsv', headers: { 'Content-Type': 'text/tab-separated-values' } },
};

const headers = {
  'Content-Type': 'multipart/form-data', // Upload as file
  // 'Content-Type': 'application/json', // Upload as json string
  // 'Content-Type': 'text/tab-separated-values', // Upload as tsv string
};

function validateFormat(format) {
  if (!formats[format]) {
    throw new Error(`Invalid format: ${format}`);
  }
}

export default class DonorsApi extends DomainApi {
  feedUrl = `${settings.urls.donors}`;

  constructor() {
    super('donors');
  }

  /**
   * Uploads donors data.
   * @param {Object} data data to upload.
   * @param {'json'|'tsv'} [format] data format (default: 'json').
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadDonors(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/donors/${formats[format].path}`;
    const body = data;
    const config = { headers: formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads treatments data.
   * @param {Object} data data to upload. 
   * @param {'json'|'tsv'} format data format (default: 'json'). 
   * @returns {Promise<Object>} A promise that resolves with the upload results.
   */
  async uploadTreatments(data, format = formats.json.name) {
    validateFormat(format);

    const url = `${this.feedUrl}/treatments/${formats[format].path}`;
    const body = data;
    const config = { headers: headers };

    return this.client.post(url, body, config);
  }
}
