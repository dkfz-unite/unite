import FilterType from "../../../../filter-type";
import ValueType from "../../../../filter-value-type";

import SsmType from "@/_models/domain/genome/variants/ssm/enums/ssm-type";

import { mapOptions } from "../../../../filter-options-helpers";
import { sanitiseArray } from "../../../../filter-criteria-helpers";
import variantFilters from "../variant-filters";

const filters = [
  {
    field: "id",
    label: "ID",
    placeholder: "e.g. SSM11033",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  variantFilters[0],
  {
    field: "type",
    label: "Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.typeOptions, SsmType.values)
  },
  ...variantFilters.slice(1)
];

export default filters;