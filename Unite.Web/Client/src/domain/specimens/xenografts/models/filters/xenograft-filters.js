import TumorGrowthForm from "../enums/tumor-growth-form";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "@/_shared/components/filters/filter-criteria-helpers";
import { specimen, molecular, drugs } from "../../../_shared/specimens/models/filters/specimen-filters";

const filters = [
  ...specimen,
  {
    field: "mouseStrain",
    label: "Mouse Strain",
    placeholder: "e.g. NSG",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "intervention",
    label: "Intervention",
    placeholder: "e.g. Drug treatment",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "survivalDays",
    label: "Survival Days",
    labelFrom: "From",
    labelTo: "To",
    placeholderFrom: "e.g. 14",
    placeholderTo: "e.g. 28",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value)
  },
  {
    field: "tumorigenicity",
    label: "Tumorigenicity",
    type: FilterType.Boolean,
    default: null
  },
  {
    field: "tumorGrowthForm",
    label: "Tumor Growth Form",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.tumorGrowthFormOptions, TumorGrowthForm.values)
  },
  ...molecular,
  ...drugs
];

export default filters;