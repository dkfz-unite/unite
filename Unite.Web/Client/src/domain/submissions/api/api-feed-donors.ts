import FeedApi, { Format } from "./api-feed";
import DonorsSubmissionType from "../models/enums/submission-type-donors";
import settings from "@/settings";

export default class DonorsFeedApi extends FeedApi {
  private readonly feedUrl: string = `${settings.urls.donors}`;

  protected formats: Record<string, Format> = {
    json: new Format({name: "json", path: "/", headers: {"Content-Type": "application/json"}}),
    tsv: new Format({name: "tsv", path: "/tsv", headers: {"Content-Type": "text/tab-separated-values"}})
  }

   /**
   * Uploads donors data.
   * @param data data to upload.
   * @param format data format (default: "json").
   * @returns A promise that resolves with the upload results.
   */
  async uploadDonors(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/entries${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Uploads treatments data.
   * @param data data to upload. 
   * @param format data format (default: "json").
   * @returns A promise that resolves with the upload results.
   */
  public async uploadTreatments(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/treatments${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  
  public async getSubmission(id: string, type: string): Promise<any> {
    let url = null;
    
    if (type == DonorsSubmissionType.DON)
      url = `${this.feedUrl}/entries/${id}`;
    else if (type == DonorsSubmissionType.DON_TRT)
      url = `${this.feedUrl}/treatments/${id}`;
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}