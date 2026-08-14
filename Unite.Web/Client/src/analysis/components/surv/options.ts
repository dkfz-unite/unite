import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

const options = [
  // General
  new OptionsGroup("General", [
    new SelectOption({
      key: "progression",
      title: "Property",
      default: "false",
      options: [
        new SelectValue("Survival", "false"),
        new SelectValue("Progression", "true")
      ]
    })
  ])
];

export default options;