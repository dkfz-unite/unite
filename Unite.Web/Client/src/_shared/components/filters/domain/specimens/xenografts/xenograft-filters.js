import FilterType from "../../../filter-type";
import ValueType from "../../../filter-value-type";

import TumorGrowthForm from "../../../../../../_models/domain/specimens/xenografts/enums/tumor-growth-form";

import { mapOptions } from "../../../filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "../../../filter-criteria-helpers";
import specimenFilters from "../specimen-filters";

const filters = [
  specimenFilters[0],
  specimenFilters[1],
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
  specimenFilters[2],
  specimenFilters[3]
];

export default filters;