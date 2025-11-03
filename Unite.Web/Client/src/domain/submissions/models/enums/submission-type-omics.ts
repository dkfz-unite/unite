import { SubmissionTypeBase } from "./submission-type-base";

export default class OmicsSubmissionType extends SubmissionTypeBase {
  static readonly DNA = "dna";
  static readonly DNA_SM = "dna-sm";
  static readonly DNA_CNV = "dna-cnv";
  static readonly DNA_SV = "dna-sv";
  static readonly METH = "meth";
  static readonly METH_LVL = "meth-lvl";
  static readonly RNA = "rna";
  static readonly RNA_EXP = "rna-exp";
  static readonly RNASC = "rnasc";
  static readonly RNASC_EXP = "rnasc-exp";

  static readonly map = new Map<string, string>([
    [OmicsSubmissionType.DNA, "DNA Sample"],
    [OmicsSubmissionType.DNA_SM, "DNA SM"],
    [OmicsSubmissionType.DNA_CNV, "DNA CNV"],
    [OmicsSubmissionType.DNA_SV, "DNA SV"],
    [OmicsSubmissionType.METH, "Methylation Sample"],
    [OmicsSubmissionType.METH_LVL, "Methylation Levels"],
    [OmicsSubmissionType.RNA, "RNA Sample"],
    [OmicsSubmissionType.RNA_EXP, "RNA Expression"],
    [OmicsSubmissionType.RNASC, "scRNA Sample"],
    [OmicsSubmissionType.RNASC_EXP, "scRNA Expression"]
  ]);

  static isSampleType(type: string): boolean {
    return [this.DNA, this.METH, this.RNA, this.RNASC].includes(type);
  }

  static isDataType(type: string): boolean {
    return [this.DNA_SM, this.DNA_CNV, this.DNA_SV, this.RNA_EXP].includes(type);
  };

  static IsResourceType(type: string): boolean {
    return [this.METH_LVL, this.RNASC_EXP].includes(type);
  }
}