import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import { OptionsGroup, BooleanOption, NumberOption, SelectOption, SelectValue } from "../_shared/options";

let analysis = new Analysis();
analysis.type = AnalysisType.CEDP;
analysis.name = null;
analysis.description = null;
analysis.datasets = [];
analysis.options = [
  new OptionsGroup("Preprocessing options", [
    new SelectOption<string>("normalization_method", "Normalization method", [
      new SelectValue("Median", "median", true),
      new SelectValue("Quantile", "quantile")
    ]),

    new NumberOption("normalization_log_offset", "Normalization log offset", 0.1, 0, 1, 0.1),

    new SelectOption<string>("imputation_method", "Imputation method", [
      new SelectValue("MinDet", "mindet", true),
      new SelectValue("MinProb", "minprob")
    ]),

    new BooleanOption("stratify_imputation_by_batch", "Stratify imputation by batch", false),

    new SelectOption<string>("batch_correction_method", "Batch correction method", [
      new SelectValue("ComBat", "combat"),
      new SelectValue("Limma", "limma"),
      new SelectValue("None", null, true)
    ]),

    new NumberOption("min_non_missing_fraction", "Minimum non-missing values fraction", 0.7, 0, 1, 0.1),

    new BooleanOption("require_min_fraction_one_class", "Require non-missing fraction in one class", true)
  ])
];

export default analysis;