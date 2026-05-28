import { Options, SelectOption, SelectValue, BooleanOption, NumberOption } from "../_shared/options";

export default class AnalysisOptions extends Options {
  normalizationMethod: SelectOption<string>;
  normalizationLogOffset: NumberOption;
  imputationMethod: SelectOption<string>;
  stratifyImputationByBatch: BooleanOption;
  batchCorrectionMethod: SelectOption<string>;
  minNonMissingFraction: NumberOption;
  requireMinFractionOneClass: BooleanOption;

  constructor() {
    super();

    this.normalizationMethod = new SelectOption<string>([
      new SelectValue("Median", "median", true),
      new SelectValue("Quantile", "quantile")
    ]);

    this.normalizationLogOffset = new NumberOption(0.1, 0, 1);

    this.imputationMethod = new SelectOption<string>([
      new SelectValue("MinDet", "mindet", true),
      new SelectValue("MinProb", "minprob")
    ]);

    this.stratifyImputationByBatch = new BooleanOption(false);

    this.batchCorrectionMethod = new SelectOption<string>([
      new SelectValue("ComBat", "combat"),
      new SelectValue("Limma", "limma"),
      new SelectValue("None", null, true)
    ]);

    this.minNonMissingFraction = new NumberOption(0.7, 0, 1);

    this.requireMinFractionOneClass = new BooleanOption(true);
  }

  toDictionary() {
    return {
      "normalization_method": this.normalizationMethod.value,
      "normalization_log_offset": this.normalizationLogOffset.value,
      "imputation_method": this.imputationMethod.value,
      "stratify_imputation_by_batch": this.stratifyImputationByBatch.value,
      "batch_correction_method": this.batchCorrectionMethod.value,
      "min_non_missing_fraction": this.minNonMissingFraction.value,
      "require_min_fraction_one_class": this.requireMinFractionOneClass.value
    };
  }
}