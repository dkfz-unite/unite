import { AnalysisTitle } from "./_shared/analysis-type";

const mixin = {
  methods: {
    getProgressColor(status) {
      switch (status) {
        case "Preparing": return "orange-4";
        case "Prepared": return "orange-4";
        case "Processing": return "orange-4";
        case "Processed": return "green-4";
        case "Failed": return "red-4";
        default: return "grey-4";
      }
    },

    getProgressValue(status) {
      switch (status) {
        case "Preparing": return 0.25;
        case "Prepared": return 0.50;
        case "Processing": return 0.75;
        case "Processed": return 1;
        case "Failed": return 1;
        default: return 0;
      }
    },

    getAnalysisType(type) {
      const title = AnalysisTitle[type];
      return title || type;

      // switch (type) {
      //   case "surv": return "Survival Curve Estimation"
      //   case "dm": return "Differential Methylation Analysis";
      //   case "pcam": return "PCA of Methylation Profiles";
      //   case "deg": return "Differential Gene Expression";
      //   case "dep": return "Differential Protein Expression";
      //   case "gaf": return "Gene Alteration Frequency";
      //   case "scell": return "scRNA Dataset Creation";
      //   case "umapp": return "UMAP of Protein Expression Profiles";
      //   default: return type;
      // }
    }
  }
}

export default mixin;