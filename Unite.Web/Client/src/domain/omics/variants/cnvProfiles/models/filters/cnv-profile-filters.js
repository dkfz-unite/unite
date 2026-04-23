import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";

const filters = [
  {
    field: "specimenId",
    label: "Specimen ID",
    placeholder: "e.g. 11033",
    type: FilterType.Values,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseArray(value)
  }
];

export default filters;