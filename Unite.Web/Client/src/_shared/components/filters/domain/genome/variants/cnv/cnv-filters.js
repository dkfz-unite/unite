import FilterType from "../../../../filter-type";
import ValueType from "../../../../filter-value-type";

import CnvType from "@/_models/domain/genome/variants/cnv/enums/cnv-type";

import { mapOptions } from "../../../../filter-options-helpers";
import { sanitiseArray } from "../../../../filter-criteria-helpers";
import variantFilters from "../variant-filters";

const filters = [
  {
    field: "id",
    label: "ID",
    placeholder: "e.g. CNV11033",
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
    options: (context) => mapOptions(context?.typeOptions, CnvType.values)
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