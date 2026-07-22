import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectManyOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

export const keys = {
  donors: "donors",
  genes: "genes",
  sm: "sm"
}

const options = [
  // General
  new OptionsGroup("General", [
    // new NumberOption({
    //   key: keys.donors,
    //   title: "Number of donors (max. 200)",
    //   default: 50,
    //   min: 1,
    //   max: 200,
    //   step: 10
    // }),

    new NumberOption({
      key: keys.genes,
      title: "Number of genes (max. 50)",
      default: 20,
      min: 1,
      max: 50,
      step: 5
    }),

    new SelectManyOption({
      key: keys.sm,
      title: "Mutation impact(s)",
      default: ["Hight", "Moderate"],
      options: [
        new SelectValue("High", "High"),
        new SelectValue("Moderate", "Moderate"),
        new SelectValue("Low", "Low"),
        new SelectValue("Unknown", "Unknown")
      ]
    })
  ])
];

export default options;