import CellsSpecies from "../enums/species";
import CellsType from "../enums/cell-type";
import CellsCultureType from "../enums/cell-culture-type";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";
import specimenFilters from "../../../_shared/specimens/models/filters/specimen-filters";

const filters = [
  specimenFilters[0],
  specimenFilters[1],
  {
    field: "species",
    label: "Cells Species",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.speciesOptions, CellsSpecies.values)
  },
  {
    field: "type",
    label: "Cells Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.typeOptions, CellsType.values)
  },
  {
    field: "cultureType",
    label: "Cells Culture Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.cultureTypeOptions, CellsCultureType.values)
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