import ModelsApi from "@/domain/_shared/entries/api";
import settings from "@/settings";
import SubmissionType from "../models/enums/submission-type";
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

    if (type == SubmissionType.MRI)
      url = `${this.feedUrl}/entries/${ImageType.Mri}/${id}`;
    else if (type == SubmissionType.CT)
      url = `${this.feedUrl}/entries/${ImageType.Ct}/${id}`;
    else if (type == SubmissionType.Radiomics){
      url = `${this.feedUrl}/analysis/${ImageType.Radiomics}/${id}`;
    }
    else
      throw new Error(`Invalid submission type: ${type}`);

    return await this.client.get(url);
  }
}
