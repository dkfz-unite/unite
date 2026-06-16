import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

const options = [
  // General
  new OptionsGroup("General", [
    new SelectOption({
      key: "feature_type",
      title: "Feature type",
      default: "protein",
      options: [
        new SelectValue("Protein", "protein"),
        new SelectValue("Gene", "gene")
      ]
    }), 
    
    new SelectOption({
      key: "protein",
      title: "Protein",
      lazy: SelectMethod.Filter,
      show: (options: IOption[]) => options?.find(o => o.key === "feature_type")?.value === "protein"
    }),

    new SelectOption({
      key: "gene",
      title: "Gene",
      lazy: SelectMethod.Filter,
      show: (options: IOption[]) => options?.find(o => o.key === "feature_type")?.value === "gene"
    }),

    new SelectOption({
      key: "condition_property",
      title: "Condition property",
      options: [],
      lazy: SelectMethod.Once
    })
  ]),

  // Preprocessing
  new OptionsGroup("Preprocessing", [
    new SelectOption({
      key: "normalization_method",
      title: "Normalization method",
      default: "median",
      options: [
        new SelectValue("Median", "median"),
        new SelectValue("Quantile", "quantile")
      ]
    }),

    new NumberOption({
      key: "normalization_log_offset",
      title: "Normalization log offset",
      default: 0.1,
      min: 0,
      max: 1,
      step: 0.1
    }),

    new SelectOption({
      key: "imputation_method",
      title: "Imputation method",
      default: "mindet",
      options: [
        new SelectValue("MinDet", "mindet"),
        new SelectValue("MinProb", "minprob")
      ]
    }),

    new BooleanOption({
      key: "stratify_imputation_by_batch",
      title: "Stratify imputation by batch",
      default: false
    }),

    new SelectOption({
      key: "batch_correction_method",
      title: "Batch correction method",
      default: null,
      options: [
        new SelectValue("ComBat", "combat"),
        new SelectValue("Limma", "limma"),
        new SelectValue("None", null)
      ]
    }),

    new NumberOption({
      key: "min_non_missing_fraction",
      title: "Minimum non-missing values fraction",
      default: 0.7,
      min: 0,
      max: 1,
      step: 0.1
    }),

    new BooleanOption({
      key: "require_min_fraction_one_class",
      title: "Require non-missing fraction in one class",
      default: true
    })
  ])
];

export default options;