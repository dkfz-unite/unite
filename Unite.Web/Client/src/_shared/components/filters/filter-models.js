export default class FilterModels {
  static Donor = "donor";
  static Mri = "mri";
  // static Ct = "ct";
  static Tissue = "material";
  static Cell = "line";
  static Organoid = "organoid";
  static Xenograft = "xenograft";
  static Gene = "gene";
  static Ssm = "ssm";
  static Cnv = "cnv";
  static Sv = "sv";
  static Oncogrid = "oncogrid";

  static Images = [FilterModels.Mri];
  static Specimens = [FilterModels.Tissue, FilterModels.Cell, FilterModels.Organoid, FilterModels.Xenograft];
  static Genome = [FilterModels.Gene, FilterModels.Ssm, FilterModels.Cnv, FilterModels.Sv];
  static All = [FilterModels.Donor, ...FilterModels.Images, ...FilterModels.Specimens, ...FilterModels.Genome];
}