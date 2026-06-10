import ApiClient from "./api-client";
import settings from "@/settings";

export default class AutocompleteApi {
  private client: ApiClient;
  private baseUrl: string = `${settings.urls.composer}/autocomplete`;

  constructor() {
    this.client = new ApiClient();
  }

  public async values(model: string, field: string, query: string): Promise<any> {
    const url = `${this.baseUrl}?model=${model}&field=${field}&query=${query || ""}`;
    return this.client.get(url);
  }
}