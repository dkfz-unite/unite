import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";

import TissueType from "@/_models/domain/specimens/tissues/enums/tissue-type";
import TumorType from "@/_models/domain/specimens/tissues/enums/tumor-type";

import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";
import specimenFilters from "../../_shared/specimens/filters/specimen-filters";

const filters = [
  specimenFilters[0],
  specimenFilters[1],
  {
    field: "type",
    label: "Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.typeOptions, TissueType.values),
    watch: (value, criteria, context) => {
      criteria.tumorType = [];
    }
  },
  {
    field: "tumorType",
    label: "Tumor Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.tumorTypeOptions, TumorType.values),
    show: (value, criteria, context) => {
      return criteria.type?.length == 1 
          && criteria.type[0] == TissueType.Tumor;
    }
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