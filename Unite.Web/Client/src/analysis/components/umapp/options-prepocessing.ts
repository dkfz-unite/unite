import { ValueOption, ValuesOption, NumberOption } from "./option";

// normalizationMethod: {
//           value: "median",
//           default: "median",
//           options: [
//             { label: "Median", value: "median" },
//             { label: "Quantile", value: "quantile" }
//           ]
//         },
//         normalizationLogOffset: {
//           value: 0.1,
//           default: 0.1,
//           min: 0,
//           max: 1
//         },
//         imputationMethod: {
//           value: "mindet",
//           default: "mindet",
//           options: [
//             { label: "MinDet", value: "mindet" },
//             { label: "MinProb", value: "minprob" }
//           ]
//         },
//         stratifyImputationByBatch: {
//           value: false,
//           default: false
//         },
//         batchCorrectionMethod: {
//           value: null,
//           default: null,
//           options: [
//             { label: "ComBat", value: "combat" },
//             { label: "Limma", value: "limma" },
//             { label: "None", value: null }
//           ]
//         },
//         minNonMissingFraction: {
//           value: 0.7,
//           default: 0.7,
//           min: 0,
//           max: 1
//         },
//         requireMinFractionOneClass: {
//           value: true,
//           default: true
//         },

export default class PreprocessingOptions {
  normalizationMethod: ValuesOption = new ValuesOption({
    default: "median",
    options: [
      { label: "Median", value: "median" },
      { label: "Quantile", value: "quantile" }
    ]
  });

  normalizationLogOffset: NumberOption = new NumberOption({ 
    default: 0.1,
    min: 0,
    max: 1
  });

  imputationMethod: ValuesOption = new ValuesOption({
    default: "mindet",
    options: [
      { label: "MinDet", value: "mindet" },
      { label: "MinProb", value: "minprob" }
    ]
  });

  stratifyImputationByBatch: ValueOption<boolean> = new ValueOption<boolean>({
    default: false
  });

  batchCorrectionMethod: ValuesOption = new ValuesOption({
    default: null,
    options: [
      { label: "ComBat", value: "combat" },
      { label: "Limma", value: "limma" },
      { label: "None", value: null }
    ]
  });

  minNonMissingFraction: NumberOption = new NumberOption({
    default: 0.7,
    min: 0,
    max: 1
  });

  requireMinFractionOneClass: ValueOption<boolean> = new ValueOption<boolean>({
    default: true
  });

  constructor(
    normalizationMethod?: Partial<ValuesOption>,
    normalizationLogOffset?: Partial<NumberOption>,
    imputationMethod?: Partial<ValuesOption>,
    stratifyImputationByBatch?: Partial<ValueOption<boolean>>,
    batchCorrectionMethod?: Partial<ValuesOption>,
    minNonMissingFraction?: Partial<NumberOption>,
    requireMinFractionOneClass?: Partial<ValueOption<boolean>>)
  {
    this.normalizationMethod = new ValuesOption(normalizationMethod ?? {});
    this.normalizationLogOffset = new NumberOption(normalizationLogOffset ?? {});
    this.imputationMethod = new ValuesOption(imputationMethod ?? {});
    this.stratifyImputationByBatch = new ValueOption<boolean>(stratifyImputationByBatch ?? {});
    this.batchCorrectionMethod = new ValuesOption(batchCorrectionMethod ?? {});
    this.minNonMissingFraction = new NumberOption(minNonMissingFraction ?? {});
    this.requireMinFractionOneClass = new ValueOption<boolean>(requireMinFractionOneClass ?? {});
  }
}
