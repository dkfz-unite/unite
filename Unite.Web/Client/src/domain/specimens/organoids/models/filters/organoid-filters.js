import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";
import { specimen, classification, molecular, drugs} from "../../../_shared/specimens/models/filters/specimen-filters";

const filters = [
  ...specimen,
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
  ...classification,
  ...molecular,
  ...drugs
];

export default filters;