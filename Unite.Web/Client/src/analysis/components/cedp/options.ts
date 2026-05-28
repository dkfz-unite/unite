import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectValue } from "../_shared/options";

const options = [
  new OptionsGroup("Preprocessing", [
    new SelectOption("normalization_method", "Normalization method", [
      new SelectValue("Median", "median", true),
      new SelectValue("Quantile", "quantile")
    ]),

    new NumberOption("normalization_log_offset", "Normalization log offset", 0.1, 0, 1, 0.1),

    new SelectOption("imputation_method", "Imputation method", [
      new SelectValue("MinDet", "mindet", true),
      new SelectValue("MinProb", "minprob")
    ]),

    new BooleanOption("stratify_imputation_by_batch", "Stratify imputation by batch", false),

    new SelectOption("batch_correction_method", "Batch correction method", [
      new SelectValue("ComBat", "combat"),
      new SelectValue("Limma", "limma"),
      new SelectValue("None", null, true)
    ]),

    new NumberOption("min_non_missing_fraction", "Minimum non-missing values fraction", 0.7, 0, 1, 0.1),

    new BooleanOption("require_min_fraction_one_class", "Require non-missing fraction in one class", true)
  ])
];

export default options;