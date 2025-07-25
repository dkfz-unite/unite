import MaterialType from "../enums/material-type";
import FixationType from "../enums/fixation-type";
import TumorType from "../enums/tumor-type";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "@/_shared/components/filters/filter-criteria-helpers";
import specimenFilters from "../../../_shared/specimens/models/filters/specimen-filters";

const filters = [
  specimenFilters[0],
  specimenFilters[1],
  {
    field: "type",
    label: "Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.typeOptions, MaterialType.values),
    watch: (value, criteria, context) => {
      criteria.tumorType.value = [];
    }
  },
  {
    field: "tumorType",
    label: "Tumor Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.tumorTypeOptions, TumorType.values),
    show: (value, criteria, context) => {
      return criteria.type?.value?.length == 1 
          && criteria.type.value[0] == MaterialType.Tumor;
    }
  },
  {
    field: "tumorGrade",
    label: "Tumor Grade",
    labelFrom: "Tumor Grade (From)",
    labelTo: "Tumor Grade (To)",
    placeholderFrom: "e.g. 1",
    placeholderTo: "e.g. 5",
    type: FilterType.Range,
    valueType: ValueType.Number,
    expandable: false,
    sanitize: (value) => sanitiseRange(value),
    show: (value, criteria, context) => {
      return criteria.type?.value?.length == 1 
          && criteria.type.value[0] == MaterialType.Tumor;
    }
  },
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
  specimenFilters[2]
];

export default filters;