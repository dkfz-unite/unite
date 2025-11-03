import DonorsSubmissionType from "./submission-type-donors";
import ImageSubmissionType from "./submission-type-image";
import OmicsSubmissionType from "./submission-type-omics";
import SpecimenSubmissionType from "./submission-type-specimen";

export default class SubmissionType {
  static readonly Donors = DonorsSubmissionType;
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