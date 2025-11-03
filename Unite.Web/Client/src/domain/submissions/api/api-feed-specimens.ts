import FeedApi, { Format } from "./api-feed";
import settings from "@/settings";
import SpecimenSubmissionType from "../models/enums/submission-type-specimen";
import SpecimenType from "@/domain/specimens/_shared/specimens/models/enums/specimen-type";

export default class SpecimensFeedApi extends FeedApi {
  private readonly feedUrl: string = `${settings.urls.specimens}`;

  protected formats: Record<string, Format> = {
    json: new Format({ name: "json", path: "/", headers: { "Content-Type": "application/json" } }),
    tsv: new Format({ name: "tsv", path: "/tsv", headers: { "Content-Type": "text/tab-separated-values" } }),
  };

  /**
   * Upload materials data.
   * @param data Data to upload.
   * @param format Data format (default: json).
   */
  public async uploadMaterials(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/entries/material${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Upload cell lines data.
   * @param data Data to upload.
   * @param format Data format (default: json).
   */
  public async uploadLines(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/entries/line${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Upload organoids data.
   * @param data Data to upload.
   * @param format Data format (default: json).
   */
  public async uploadOrganoids(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/entries/organoid${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Upload xenografts data.
   * @param data Data to upload.
   * @param format Data format (default: json).
   */
  public async uploadXenografts(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/entries/xenograft${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Upload interventions data.
   * @param data Data to upload.
   * @param format Data format (default: json).
   */
  public async uploadInterventions(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/interventions${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  /**
   * Upload drugs screening data.
   * @param data Data to upload.
   * @param format Data format (default: json).
   */
  public async uploadDrugs(data: any, format: string = this.formats.json.name) {
    this.validateFormat(format);

    const url = `${this.feedUrl}/analysis/drugs${this.formats[format].path}`;
    const body = data;
    const config = { headers: this.formats[format].headers };

    return this.client.post(url, body, config);
  }

  public async getSubmission(id: string, type: string): Promise<any> {
    let url: string | null = null;

    if (type == SpecimenSubmissionType.MAT)
      url = `${this.feedUrl}/entries/${SpecimenType.Material}/${id}`;
    else if (type == SpecimenSubmissionType.LNE)
      url = `${this.feedUrl}/entries/${SpecimenType.Line}/${id}`;
    else if (type == SpecimenSubmissionType.ORG)
      url = `${this.feedUrl}/entries/${SpecimenType.Organoid}/${id}`;
    else if (type == SpecimenSubmissionType.XEN)
      url = `${this.feedUrl}/entries/${SpecimenType.Xenograft}/${id}`;
    else if (type == SpecimenSubmissionType.SPE_INT)
      url = `${this.feedUrl}/interventions/${id}`;
    else if (type == SpecimenSubmissionType.SPE_DRG)
      url = `${this.feedUrl}/analysis/drugs/${id}`;
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}