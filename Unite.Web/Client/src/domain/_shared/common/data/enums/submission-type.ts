export default class SubmissionType {
  static readonly DON = "don";
  static readonly DON_TRT = "don-trt";
  static readonly MR = "mr";
  static readonly CT = "ct";
  static readonly IMG_RAD = "img-rad";
  static readonly MAT = "mat";
  static readonly LNE = "lne";
  static readonly ORG = "org";
  static readonly XEN = "xen";
  static readonly SPE_INT = "spe-int";
  static readonly SPE_DRG = "spe-drg";
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
    [this.DON, "Donors"],
    [this.DON_TRT, "Donor Treatments"],
    [this.MR, "MR Images"],
    [this.CT, "CT Images"],
    [this.IMG_RAD, "Radiomics features"],
    [this.MAT, "Materials"],
    [this.LNE, "Lines"],
    [this.ORG, "Organoids"],
    [this.XEN, "Xenografts"],
    [this.SPE_INT, "Specimen Interventions"],
    [this.SPE_DRG, "Specimen Drurgs Screning"],
    [this.DNA, "DNA Samples"],
    [this.DNA_SM, "DNA SMs"],
    [this.DNA_CNV, "DNA CNVs"],
    [this.DNA_SV, "DNA SVs"],
    [this.METH, "Methylation Samples"],
    [this.METH_LVL, "Methylation Levels"],
    [this.RNA, "RNA Samples"],
    [this.RNA_EXP, "RNA Expressions"],
    [this.RNASC, "scRNA Samples"],
    [this.RNASC_EXP, "scRNA Expressions"]
  ]);

  static includes(key: string): boolean {
    return this.map.has(key);
  }

  static getLabel(key: string): string {
    const label = this.map.get(key);

    if (!label)
      console.error(`SubmissionType key "${key}" not found`);

    return label ?? key;
  }

  static isDonors(key: string) : boolean {
    return [this.DON, this.DON_TRT].includes(key);
  }

  static isImages(key: string): boolean {
    return [this.MR, this.CT, this.IMG_RAD].includes(key);
  }

  static isSpecimens(key: string): boolean {
    return [this.MAT, this.LNE, this.ORG, this.XEN, this.SPE_INT, this.SPE_DRG].includes(key);
  }

  static isOmics(key: string): boolean {
    return this.isOmicsSampleType(key) || this.isOmicsDataType(key) || this.isOmicsResourceType(key);
  }

  static isOmicsSampleType(key: string): boolean {
    return [this.DNA, this.METH, this.RNA, this.RNASC].includes(key);
  }

  static isOmicsDataType(key: string): boolean {
    return [this.DNA_SM, this.DNA_CNV, this.DNA_SV, this.RNA_EXP].includes(key);
  }

  static isOmicsResourceType(key: string): boolean {
    return [this.METH_LVL, this.RNASC_EXP].includes(key);
  }
}
