import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";
import specimenFilters from "../../../_shared/specimens/models/filters/specimen-filters";

const filters = [
  specimenFilters[0],
  specimenFilters[1],
  {
    field: "medium",
    label: "Medium",
    placeholder: "e.g. Wnt3a",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "tumorigenicity",
    label: "Tumorigenicity",
    type: FilterType.Boolean,
    default: null
  },
  {
    field: "intervention",
    label: "Intervention",
    placeholder: "e.g. Drug treatment",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  specimenFilters[2],
  specimenFilters[3]
];

export default filters;