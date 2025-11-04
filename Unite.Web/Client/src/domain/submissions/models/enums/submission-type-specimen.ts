import { SubmissionTypeBase } from "./submission-type-base";

export default class SpecimenSubmissionType extends SubmissionTypeBase {
  static readonly MAT = "mat";
  static readonly LNE = "lne";
  static readonly ORG = "org";
  static readonly XEN = "xen";
  static readonly SPE_INT = "spe-int";
  static readonly SPE_DRG = "spe-drg";

  static readonly map = new Map<string, string>([
    [SpecimenSubmissionType.MAT, "Material"],
    [SpecimenSubmissionType.LNE, "Line"],
    [SpecimenSubmissionType.ORG, "Organoid"],
    [SpecimenSubmissionType.XEN, "Xenograft"],
    [SpecimenSubmissionType.SPE_INT, "Specimen Intervention"],
    [SpecimenSubmissionType.SPE_DRG, "Specimen Drugs Screening"],
  ]);

  static isEntryType(type: string): boolean {
    return [this.MAT, this.LNE, this.ORG, this.XEN].includes(type);
  }

  static isListType(type: string): boolean {
    return type === this.SPE_INT;
  }

  static isAnalysisType(type: string): boolean {
    return type === this.SPE_DRG;
  }
}