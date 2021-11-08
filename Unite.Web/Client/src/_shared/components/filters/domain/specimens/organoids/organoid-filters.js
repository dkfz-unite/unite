import FilterType from "../../../filter-type";
import ValueType from "../../../filter-value-type";

import { sanitiseArray } from "../../../filter-criteria-helpers";
import specimenFilters from "../specimen-filters";

const filters = [
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
  ...specimenFilters
];

export default filters;