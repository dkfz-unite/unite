import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

const options = [
  // General
  new OptionsGroup("General", [
    new SelectOption("feature_type", "Feature type", [
      new SelectValue("Protein", "protein", true),
      new SelectValue("Gene", "gene")
    ]), 
    
    new SelectOption("protein", "Protein", [], SelectMethod.Filter, (options: IOption[]) => options?.find(o => o.key === "feature_type")?.value === "protein"),
    new SelectOption("gene", "Gene", [], SelectMethod.Filter, (options: IOption[]) => options?.find(o => o.key === "feature_type")?.value === "gene"),
    new SelectOption("condition_property", "Condition property", [], SelectMethod.Once)
  ]),

  // Preprocessing
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