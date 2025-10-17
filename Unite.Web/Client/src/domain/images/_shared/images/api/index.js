import ModelsApi from "@/domain/_shared/entries/api";
import settings from "@/settings";
import SubmissionType from "@/domain/_shared/common/data/enums/submission-type";
import ImageType from "../models/enums/image-type";

export default class ImagesApi extends ModelsApi {
  feedUrl = `${settings.urls.images}`;
  constructor(type) {
    super(`images/${type}`);
  }


  /**
   * Get submission document.
   * @param {number|string} id submission id.
   * @param {SubmissionType} type submission type.
   * @returns {Promise<Object>} A promise that resolves with the submission document.
   */
  async getSubmission(id, type) {
    let url = null;

    if (type == SubmissionType.MR)
      url = `${this.feedUrl}/entries/${ImageType.MR}/${id}`;
    else if (type == SubmissionType.CT)
      url = `${this.feedUrl}/entries/${ImageType.CT}/${id}`;
    else if (type == SubmissionType.Radiomics){
      url = `${this.feedUrl}/analysis/radiomics/${id}`;
    }
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}
