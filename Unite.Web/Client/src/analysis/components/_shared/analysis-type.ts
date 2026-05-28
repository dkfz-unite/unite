enum AnalysisType {
  DEP = "dep",
  DEG = "deg",
  CEDP = "cedp",
  CEDG = "cedg",
  DM = "dm",
  PCAM = "pcam",
  GAF = "gaf",
  SCELL = "scell",
  SURV = "surv",
  UMAPP = "umapp"
}

export default AnalysisType;

// export const AnalysisTypeName = new Map<string, string>([
//   [AnalysisType.DEP, "Differential protein expression"],
//   [AnalysisType.DEG, "Differential gene expression"],
//   [AnalysisType.CEDP, "Protein expression distribution per condition"],
//   [AnalysisType.CEDG, "Gene expression distribution per condition"],
//   [AnalysisType.DM, "Differential methylation"],
//   [AnalysisType.PCAM, "PCA of methylation profiles"],
//   [AnalysisType.GAF, "Gene alteration frequency"],
//   [AnalysisType.SCELL, "scRNA dataset creation"],
//   [AnalysisType.SURV, "Survival curve estimation"],
//   [AnalysisType.UMAPP, "UMAP of protein expression profiles"]
// ]);