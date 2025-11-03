import { SubmissionTypeBase } from "./submission-type-base";

export default class ImageSubmissionType extends SubmissionTypeBase {
  static readonly MR = "mr";
  static readonly CT = "ct"
  static readonly IMG_RAD = "img-rad";

  static readonly map = new Map<string, string>([
    [ImageSubmissionType.MR, "MR Image"],
    [ImageSubmissionType.CT, "CT Image"],
    [ImageSubmissionType.IMG_RAD, "Radiomics Feature"],
  ]);
}