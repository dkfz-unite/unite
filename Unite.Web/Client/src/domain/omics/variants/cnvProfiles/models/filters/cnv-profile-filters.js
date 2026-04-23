import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";
import {mapOptions} from "@/_shared/components/filters/filter-options-helpers.js";
import Chromosome from "@/domain/omics/variants/_shared/variants/models/enums/chromosome.js";

const filters = [
  {
    field: "specimenId",
    label: "Specimen ID",
    placeholder: "e.g. 11033",
    type: FilterType.Values,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "chromosome",
    label: "Chromosome",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.chromosomeOptions, Chromosome.values)
  }
];

export default filters;