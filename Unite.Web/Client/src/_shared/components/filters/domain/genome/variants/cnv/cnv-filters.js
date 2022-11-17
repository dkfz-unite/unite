import FilterType from "../../../../filter-type";
import ValueType from "../../../../filter-value-type";

import CnaType from "@/_models/domain/genome/variants/cnv/enums/cna-type";

import { mapOptions } from "../../../../filter-options-helpers";
import variantFilters from "../variant-filters";

const filters = [
  variantFilters[0],
  {
    field: "cnaType",
    label: "CNA Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.cnaTypeOptions, CnaType.values)
  },
  {
    field: "loh",
    label: "LOH",
    type: FilterType.Boolean,
    default: null
  },
  {
    field: "homoDel",
    label: "HomoDel",
    type: FilterType.Boolean,
    default: null
  },
  ...variantFilters.slice(1)
];

export default filters;