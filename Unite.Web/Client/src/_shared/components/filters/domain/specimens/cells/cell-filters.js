import FilterType from "../../../filter-type";
import ValueType from "../../../filter-value-type";

import Species from "../../../../../../_models/domain/specimens/cells/enums/species";
import CellType from "../../../../../../_models/domain/specimens/cells/enums/cell-type";
import CellCultureType from "../../../../../../_models/domain/specimens/cells/enums/cell-culture-type";

import { mapOptions } from "../../../filter-options-helpers";
import { sanitiseArray } from "../../../filter-criteria-helpers";
import specimenFilters from "../specimen-filters";

const filters = [
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
  ...specimenFilters
];

export default filters;