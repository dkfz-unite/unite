export default class FilterModel {
  static Donor = "donor";
  static Mri = "mri";
  // static Ct = "ct";
  static Material = "material";
  static Line = "line";
  static Organoid = "organoid";
  static Xenograft = "xenograft";
  static Gene = "gene";
  static Ssm = "ssm";
  static Cnv = "cnv";
  static Sv = "sv";
  static Oncogrid = "oncogrid";

  static Images = [this.Mri];
  static Specimens = [this.Material, this.Line, this.Organoid, this.Xenograft];
  static Genome = [this.Gene, this.Ssm, this.Cnv, this.Sv];
  static All = [this.Donor, ...this.Images, ...this.Specimens, ...this.Genome];
}