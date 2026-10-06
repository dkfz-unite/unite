import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

const options = [
  // Preprocessing
  new OptionsGroup("Preprocessing", [
    new SelectOption({
      key: "pp",
      title: "Method",
      default: "Illumina",
      options: [
        new SelectValue("Illumina", "Illumina"),
        new SelectValue("SWAN", "SWAN"),
        new SelectValue("Quantile", "Quantile"),
        new SelectValue("Noob", "Noob"),
        new SelectValue("Raw", "Raw")
      ]
    })
  ])
];

export default options;