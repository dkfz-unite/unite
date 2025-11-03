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
}