import FilterType from "../../../filter-type";
import ValueType from "../../../filter-value-type";

import Chromosome from "../../../../../../_models/domain/genome/enums/chromosome";
import Biotype from "../../../../../../_models/domain/genome/genes/enums/biotype";

import { mapOptions } from "../../../filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "../../../filter-criteria-helpers";

const filters = [
  {
    field: "id",
    label: "ID",
    tooltip: "e.g. 11032",
    type: FilterType.Values,
    valueType: ValueType.Number,
    show: (value, criteria, context) => false
  },
  {
    field: "symbol",
    label: "Name",
    tooltip: "e.g. TTN",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "biotype",
    label: "Biotype",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.biotypeOptions, Biotype.values)
  },
  {
    field: "chromosome",
    label: "Chromosome",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.chromosomeOptions, Chromosome.values),
    watch: (value, criteria, context) => {
      criteria.position = { from: null, to: null };
    }
  },
  {
    field: "position",
    label: "Position",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value),
    show: (value, criteria, context) => criteria.chromosome?.length == 1
  }
];

export default filters;