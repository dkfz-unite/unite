import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

export const keys = {
  feature_type: "feature_type",
  feature: "feature",
  condition_property: "condition_property",
  normalization_method: "normalization_method",
  normalization_log_offset: "normalization_log_offset",
  imputation_method: "imputation_method",
  stratify_imputation_by_batch: "stratify_imputation_by_batch",
  batch_correction_method: "batch_correction_method",
  min_non_missing_fraction: "min_non_missing_fraction",
  require_min_fraction_one_class: "require_min_fraction_one_class"
}

const options = [
  // General
  new OptionsGroup("General", [
    new SelectOption({
      key: keys.feature_type,
      title: "Feature type",
      default: "gene",
      options: [
        new SelectValue("Protein", "protein"),
        new SelectValue("Gene", "gene")
      ]
    }), 
    
    new SelectOption({
      key: keys.feature,
      title: "Feature",
      default: null,
      options: [],
      lazy: SelectMethod.Filter
    }),

    new SelectOption({
      key: keys.condition_property,
      title: "Condition property",
      default: null,
      options: [],
      lazy: SelectMethod.Once
    })
  ]),

  // Preprocessing
  new OptionsGroup("Preprocessing", [
    new SelectOption({
      key: keys.normalization_method,
      title: "Normalization method",
      default: "median",
      options: [
        new SelectValue("Median", "median"),
        new SelectValue("Quantile", "quantile")
      ]
    }),

    new NumberOption({
      key: keys.normalization_log_offset,
      title: "Normalization log offset",
      default: 0.1,
      min: 0,
      max: 1,
      step: 0.1
    }),

    new SelectOption({
      key: keys.imputation_method,
      title: "Imputation method",
      default: "mindet",
      options: [
        new SelectValue("MinDet", "mindet"),
        new SelectValue("MinProb", "minprob")
      ]
    }),

    new BooleanOption({
      key: keys.stratify_imputation_by_batch,
      title: "Stratify imputation by batch",
      default: false
    }),

    new SelectOption({
      key: keys.batch_correction_method,
      title: "Batch correction method",
      default: null,
      options: [
        new SelectValue("ComBat", "combat"),
        new SelectValue("Limma", "limma"),
        new SelectValue("None", null)
      ]
    }),

    new NumberOption({
      key: keys.min_non_missing_fraction,
      title: "Minimum non-missing values fraction",
      default: 0.7,
      min: 0,
      max: 1,
      step: 0.1
    }),

    new BooleanOption({
      key: keys.require_min_fraction_one_class,
      title: "Require non-missing fraction in one class",
      default: true
    })
  ])
];

export default options;