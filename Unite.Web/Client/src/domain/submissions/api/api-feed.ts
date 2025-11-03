import ApiClient from "@/_shared/api/api-client";

export default abstract class FeedApi {
  protected readonly client: ApiClient = new ApiClient();
  protected abstract formats: Record<string, Format>;

  protected validateFormat(name: string): void {
    if (!this.formats.hasOwnProperty(name))
      throw new Error(`Format '${name}' is not supported.`);
  }

  /**
   * Get submission document.
   * @param id Submission id.
   * @param type Submission type.
   */
  public abstract getSubmission(id: string, type: string): Promise<any>;
}

export class Format {
  name: string;
  path: string;
  headers: Record<string, string>;

  constructor(params: { name: string; path: string; headers: Record<string, string> }) {
    this.name = params.name;
    this.path = params.path;
    this.headers = params.headers;
  }
}