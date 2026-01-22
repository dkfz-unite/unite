import CellsSpecies from "../enums/species";
import CellsType from "../enums/cell-type";
import CellsCultureType from "../enums/cell-culture-type";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";
import { specimen, classification, molecular, drugs } from "../../../_shared/specimens/models/filters/specimen-filters";

const filters = [
  ...specimen,
  {
    field: "name",
    label: "Public Name",
    placeholder: "e.g. BG5",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "cellsSpecies",
    label: "Cells Species",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.speciesOptions, CellsSpecies.values)
  },
  {
    field: "cellsType",
    label: "Cells Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.typeOptions, CellsType.values)
  },
  {
    field: "cellsCultureType",
    label: "Cells Culture Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.cultureTypeOptions, CellsCultureType.values)
  },
  {
    field: "intervention",
    label: "Intervention",
    placeholder: "e.g. Drug treatment",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  ...classification,
  ...molecular,
  ...drugs
];

export default filters;