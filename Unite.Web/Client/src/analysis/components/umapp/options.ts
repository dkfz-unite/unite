import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

const options = [
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
      default: false
    }),

    new SelectOption({
      key: "class_property",
      title: "Class property",
      show: options => options.some(option => option.key === "require_min_fraction_one_class" && option.value === true),
      options: [],
      lazy: SelectMethod.Once
    })
  ]),

  // UMAP
  new OptionsGroup("UMAP", [
    new NumberOption({
      key: "umap_n_neighbors",
      title: "Neighbors number",
      default: 15,
      min: 2,
      step: 1
    }),
    
    new SelectOption({
      key: "umap_metric",
      title: "Metric",
      default: "euclidean",
      options: [
        new SelectValue("Euclidean", "euclidean"),
        new SelectValue("Manhattan", "manhattan")
      ]
    }),

    new NumberOption({
      key: "umap_random_state",
      title: "Random state (Optional)",
      default: null,
      min: 0,
      step: 1
    }),

    new NumberOption({
      key: "umap_min_dist",
      title: "Minimal distance",
      default: 0.1,
      min: 0.1,
      step: 0.1
    }),

    new NumberOption({
      key: "umap_n_principal_components",
      title: "Principal components number",
      default: 50,
      min: 1,
      step: 1
    })
  ]),

  // Feature Selection
  new OptionsGroup("Feature Selection", [
    new SelectOption({
      key: "feature_selection_method",
      title: "Method",
      default: "variance",
      options: [
        new SelectValue("Variance", "variance"),
        new SelectValue("None", null)
      ]
    }),

    new NumberOption({
      key: "feature_selection_n_features",
      title: "Features number",
      default: 1000,
      min: 1,
      step: 1
    })
  ])
];

export default options;