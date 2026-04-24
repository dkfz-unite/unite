import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import {sanitiseArray, sanitiseRange} from "@/_shared/components/filters/filter-criteria-helpers";
import {mapOptions} from "@/_shared/components/filters/filter-options-helpers";
import Chromosome from "@/domain/omics/variants/_shared/variants/models/enums/chromosome";
import ChromosomeArm from "@/domain/omics/variants/_shared/variants/models/enums/chromosomeArm";

const filters = [
  {
    field: "chromosome",
    label: "Chromosome",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.chromosomeOptions, Chromosome.values)
  },
  {
    field: "chromosomeArm",
    label: "Chromosome Arm",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.chromosomeArmOptions, ChromosomeArm.values)
  },
  {
    field: "gain",
    label: "Gain",
    labelFrom: "From",
    labelTo: "To",
    placeholderFrom: "min 0",
    placeholderTo: "max 1",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value)
  },
  {
    field: "loss",
    label: "Loss",
    labelFrom: "From",
    labelTo: "To",
    placeholderFrom: "min 0",
    placeholderTo: "max 1",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value)
  },
  {
    field: "neutral",
    label: "Neutral",
    labelFrom: "From",
    labelTo: "To",
    placeholderFrom: "min 0",
    placeholderTo: "max 1",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value)
  }
];

export default filters;