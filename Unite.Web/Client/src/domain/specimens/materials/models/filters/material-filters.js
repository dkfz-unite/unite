import FixationType from "../enums/fixation-type";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "@/_shared/components/filters/filter-criteria-helpers";
import { specimen, classification, molecular, drugs} from "../../../_shared/specimens/models/filters/specimen-filters";

const filters = [
  ...specimen,
  {
    field: "fixationType",
    label: "Fixation Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.fixationTypes, FixationType.values)
  },
  {
    field: "source",
    label: "Source",
    placeholder: "e.g. Solid tissue",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  ...classification,
  ...molecular,
  ...drugs
];

export default filters;