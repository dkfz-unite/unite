export default class DomainNames {
  static Donors = "donors";
  static Donor = "donor";
  static Mris = "mris";
  static Mri = "mri";
  static Cts = "cts";
  static Ct = "ct";
  static Tissues = "tissues";
  static Tissue = "tissue";
  static Cells = "cells";
  static Cell = "cell";
  static Organoids = "organoids";
  static Organoid = "organoid";
  static Xenografts = "xenografts";
  static Xenograft = "xenograft";
  static Genes = "genes";
  static Gene = "gene";
  static Ssms = "ssms";
  static Ssm = "ssm";
  static Cnvs = "cnvs";
  static Cnv = "cnv";
  static Svs = "svs";
  static Sv = "sv";

  static WithCohorts = [this.Donors, this.Mris, this.Tissues, this.Cells, this.Organoids, this.Xenografts, this.Genes, this.Ssms, this.Cnvs, this.Svs];
};
