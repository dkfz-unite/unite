import FeedApi, { Format } from "./api-feed";
import settings from "@/settings";
import ImageSubmissionType from "../models/enums/submission-type-image";
import ImageType from "@/domain/images/_shared/images/models/enums/image-type";

export default class ImagesFeedApi extends FeedApi {
  private readonly feedUrl: string = `${settings.urls.images}`;

  protected formats: Record<string, Format> = {
    json: new Format({ name: "json", path: "/", headers: { "Content-Type": "application/json" } }),
    tsv: new Format({ name: "tsv", path: "/tsv", headers: { "Content-Type": "text/tab-separated-values" } }),
  };

  /**
   * Uploads MR images data.
   * @param data Data to upload.
   * @param format Data format (default: json).
   */
  public async uploadMrs(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/entries/mr${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  public async getSubmission(id: string, type: string): Promise<any> {
    let url: string | null = null;

    if (type == ImageSubmissionType.MR)
      url = `${this.feedUrl}/entries/${ImageType.MR}/${id}`;
    else if (type == ImageSubmissionType.CT)
      url = `${this.feedUrl}/entries/${ImageType.CT}/${id}`;
    else if (type == ImageSubmissionType.IMG_RAD)
      url = `${this.feedUrl}/analysis/radiomics/${id}`;
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}