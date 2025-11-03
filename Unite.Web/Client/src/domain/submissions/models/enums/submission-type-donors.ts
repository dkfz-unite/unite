import { SubmissionTypeBase } from "./submission-type-base";

export default class DonorsSubmissionType extends SubmissionTypeBase {
  static readonly DON = "don";
  static readonly DON_TRT = "don-trt";

  static readonly map = new Map<string, string>([
    [DonorsSubmissionType.DON, "Donor"],
    [DonorsSubmissionType.DON_TRT, "Donor Treatment"],
  ]);
}