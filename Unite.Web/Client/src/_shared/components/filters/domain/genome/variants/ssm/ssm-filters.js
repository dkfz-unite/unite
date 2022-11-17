import FilterType from "../../../../filter-type";
import ValueType from "../../../../filter-value-type";

import MutationType from "@/_models/domain/genome/variants/ssm/enums/mutation-type";

import { mapOptions } from "../../../../filter-options-helpers";
import variantFilters from "../variant-filters";

const filters = [
  variantFilters[0],
  {
    field: "type",
    label: "Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.typeOptions, MutationType.values)
  },
  ...variantFilters.slice(1)
];

export default filters;