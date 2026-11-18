import DonorSubmissionType from "./submission-type-donor";
import ImageSubmissionType from "./submission-type-image";
import OmicsSubmissionType from "./submission-type-omics";
import SpecimenSubmissionType from "./submission-type-specimen";

export default class SubmissionType {
  static readonly Donors = DonorSubmissionType;
  static readonly Images = ImageSubmissionType;
  static readonly Specimens = SpecimenSubmissionType;
  static readonly Omics = OmicsSubmissionType;

  static isDonorsType(type: string): boolean {
    return this.Donors.includes(type);
  }

  static isImagesType(type: string): boolean {
    return this.Images.includes(type);
  }

  static isSpecimensType(type: string): boolean {
    return this.Specimens.includes(type);
  }

  static isOmicsType(type: string): boolean {
    return this.Omics.includes(type);
  }

  static getAll(): string[] {
    return [
      this.Donors.DON,
      this.Donors.DON_TRT,
      this.Images.MR,
      this.Images.CT,
      this.Images.IMG_RAD,
      this.Specimens.MAT,
      this.Specimens.LNE,
      this.Specimens.ORG,
      this.Specimens.XEN,
      this.Specimens.SPE_INT,
      this.Specimens.SPE_DRG,
      this.Omics.RNASC,
      this.Omics.RNASC_EXP,
      this.Omics.METH,
      this.Omics.METH_LVL,
      this.Omics.RNA,
      this.Omics.RNA_EXP,
      this.Omics.PROT,
      this.Omics.PROT_EXP,
      this.Omics.DNA,
      this.Omics.DNA_SM,
      this.Omics.DNA_CNV,
      this.Omics.DNA_CNVP,
      this.Omics.DNA_SV
    ];
  }

  static compare(first: string, second: string): number {
    const types = this.getAll();
    const firstIndex = types.indexOf(first);
    const secondIndex = types.indexOf(second);

    if (firstIndex >= 0 && secondIndex >= 0)
      return firstIndex - secondIndex;
    if (firstIndex >= 0)
      return -1;
    if (secondIndex >= 0)
      return 1;

    return this.getLabel(first).localeCompare(this.getLabel(second));
  }

  static getLabel(type: string): string {
    if (this.isDonorsType(type))
      return this.Donors.getLabel(type);
    else if (this.isImagesType(type))
      return this.Images.getLabel(type);
    else if (this.isSpecimensType(type))
      return this.Specimens.getLabel(type);
    else if (this.isOmicsType(type))
      return this.Omics.getLabel(type);
    else
      return type;
  }
}
