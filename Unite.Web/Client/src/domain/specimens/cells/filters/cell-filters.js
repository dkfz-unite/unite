import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";

import Species from "@/_models/domain/specimens/cells/enums/species";
import CellType from "@/_models/domain/specimens/cells/enums/cell-type";
import CellCultureType from "@/_models/domain/specimens/cells/enums/cell-culture-type";

import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";
import specimenFilters from "../../_shared/filters/specimen-filters";

const filters = [
  specimenFilters[0],
  specimenFilters[1],
  {
    field: "species",
    label: "Species",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.speciesOptions, Species.values)
  },
  {
    field: "type",
    label: "Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.typeOptions, CellType.values)
  },
  {
    field: "cultureType",
    label: "Culture Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.cultureTypeOptions, CellCultureType.values)
  },
  {
    field: "name",
    label: "Name",
    placeholder: "e.g. BG5",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  specimenFilters[2],
  specimenFilters[3]
];

export default filters;