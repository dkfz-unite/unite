import { NumberOption, ValueOption, ValuesOption } from "./option";
import PreprocessingOptions from "./options-prepocessing";

// featureSelectionMethod: {
//           value: "variance",
//           default: "variance",
//           options: [
//             { label: "Variance", value: "variance" },
//             { label: "None", value: null }
//           ]
//         },
//         featureSelectionFeaturesNumber: {
//           value: 1000,
//           default: 1000,
//           min: 1
//         },
//         umapNeighborsNumber: {
//           value: 15,
//           default: 15,
//           min: 2
//         },
//         umapMetric: {
//           value: "euclidean",
//           default: "euclidean",
//           options: [
//             { label: "Euclidean", value: "euclidean" },
//             { label: "Manhattan", value: "manhattan" }
//           ]
//         },
//         umapRandomState: {
//           value: null,
//           default: null,
//           min: 0
//         },
//         umapMinimalDistance: {
//           value: 0.1,
//           default: 0.1,
//           min: 0.1
//         },
//         umapPrincipalComponentsNumber: {
//           value: 50,
//           default: 50,
//           min: 1
//         }

export default class UmapOptions extends PreprocessingOptions {
  featureSelectionMethod: ValuesOption = new ValuesOption({
    default: "variance",
    options: [
      { label: "Variance", value: "variance" },
      { label: "None", value: null }
    ]
  });

  featureSelectionFeaturesNumber: NumberOption = new NumberOption({
    default: 1000,
    min: 1
  });

  umapNeighborsNumber: NumberOption = new NumberOption({
    default: 15,
    min: 2
  });

  umapMetric: ValuesOption = new ValuesOption({
    default: "euclidean",
    options: [
      { label: "Euclidean", value: "euclidean" },
      { label: "Manhattan", value: "manhattan" }
    ]
  });

  umapRandomState: NumberOption = new NumberOption({
    default: null,
    min: 0
  });

  umapMinimalDistance: NumberOption = new NumberOption({
    default: 0.1,
    min: 0.1
  });

  umapPrincipalComponentsNumber: NumberOption = new NumberOption({
    default: 50,
    min: 1
  });
}
