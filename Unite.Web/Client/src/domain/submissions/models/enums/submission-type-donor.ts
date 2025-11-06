import { SubmissionTypeBase } from "./submission-type-base";

export default class DonorSubmissionType extends SubmissionTypeBase {
  static readonly DON = "don";
  static readonly DON_TRT = "don-trt";

  static readonly map = new Map<string, string>([
    [this.DON, "Donor"],
    [this.DON_TRT, "Donor Treatment"],
  ]);

  static isEntryType(type: string): boolean {
    return type == this.DON;
  }

  static isListType(type: string): boolean {
    return type == this.DON_TRT;
  }
}