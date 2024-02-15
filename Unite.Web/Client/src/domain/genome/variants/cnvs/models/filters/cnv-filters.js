import CnvType from "../enums/cnv-type";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";
import variantFilters from "../../../_shared/variants/models/filters/variant-filters";

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