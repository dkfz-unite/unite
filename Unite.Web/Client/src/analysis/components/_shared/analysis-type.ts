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

export const AnalysisTitle : Record<AnalysisType, string> = {
  [AnalysisType.DEP]: "Differential protein expression",
  [AnalysisType.DEG]: "Differential gene expression",
  [AnalysisType.CEDP]: "Protein expression distribution",
  [AnalysisType.CEDG]: "Gene expression distribution",
  [AnalysisType.DM]: "Differential methylation",
  [AnalysisType.PCAM]: "PCA of methylation profiles",
  [AnalysisType.GAF]: "Gene alteration frequency",
  [AnalysisType.SCELL]: "Single cell dataset creation",
  [AnalysisType.SURV]: "Survival curve estimation",
  [AnalysisType.UMAPP]: "UMAP of protein expression profiles"
}