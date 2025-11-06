import ModelsApi from "@/domain/_shared/entries/api";
import settings from "@/settings";
import SubmissionType from "@/domain/submissions/models/enums/submission-type-image";
import ImageType from "../models/enums/image-type";

export default class ImagesApi extends ModelsApi {
  feedUrl = `${settings.urls.images}`;
  constructor(type) {
    super(`images/${type}`);
  }
}
