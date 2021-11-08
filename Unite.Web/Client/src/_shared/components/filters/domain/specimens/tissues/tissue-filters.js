import FilterType from "../../../filter-type";
import ValueType from "../../../filter-value-type";

import TissueType from "../../../../../../_models/domain/specimens/tissues/enums/tissue-type";
import TumorType from "../../../../../../_models/domain/specimens/tissues/enums/tumor-type";

import { mapOptions } from "../../../filter-options-helpers";
import { sanitiseArray } from "../../../filter-criteria-helpers";
import specimenFilters from "../specimen-filters";

const filters = [
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
  ...specimenFilters
];

export default filters;