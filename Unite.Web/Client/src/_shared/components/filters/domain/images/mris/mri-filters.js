import FilterType from "../../../filter-type";
import ValueType from "../../../filter-value-type";

import { sanitiseRange } from "../../../filter-criteria-helpers";
import imageFilters from "../image-filters";

const filters = [
  ...imageFilters,
  {
    field: "wholeTumor",
    label: "Whole Tumor",
    labelFrom: "From (cm³)",
    labelTo: "To (cm³)",
    placeholderFrom: "e.g. 110",
    placeholderTo: "e.g. 210",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value)
  },
  {
    field: "contrastEnhancing",
    label: "Contrast Enhancing",
    labelFrom: "From (cm³)",
    labelTo: "To (cm³)",
    placeholderFrom: "e.g. 110",
    placeholderTo: "e.g. 210",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value)
  },
  {
    field: "nonContrastEnhancing",
    label: "Non Contrast Enhancing",
    labelFrom: "From (cm³)",
    labelTo: "To (cm³)",
    placeholderFrom: "e.g. 110",
    placeholderTo: "e.g. 210",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value)
  }
];

export default filters;