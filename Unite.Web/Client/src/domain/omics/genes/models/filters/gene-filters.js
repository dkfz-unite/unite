import Chromosome from "../enums/chromosome";
import Biotype from "../enums/biotype";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type"
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "@/_shared/components/filters/filter-criteria-helpers";

const filters = [
  {
    field: "id",
    label: "ID",
    placeholder: "e.g. 11033",
    type: FilterType.Values,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseArray(value, true)
  },
  {
    field: "symbol",
    label: "Name",
    placeholder: "e.g. TTN",
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
    group: "location",
    label: "Location",
    filters: [
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
        expandable: false,
        placeholderFrom: "e.g. 100100",
        placeholderTo: "e.g. 100900",
        type: FilterType.Range,
        valueType: ValueType.Number,
        sanitize: (value) => sanitiseRange(value),
        show: (value, criteria, context) => criteria.chromosome?.length == 1
      }
    ]
  },
  // {
  //   field: "hasSms",
  //   label: "SM",
  //   type: FilterType.Boolean,
  //   default: null,
  // },
  // {
  //   field: "hasCnvs",
  //   label: "CNV",
  //   type: FilterType.Boolean,
  //   default: null,
  // },
  // {
  //   field: "hasSvs",
  //   label: "SV",
  //   type: FilterType.Boolean,
  //   default: null,
  // },
  // {
  //   field: "hasGeneExp",
  //   label: "RNA",
  //   type: FilterType.Boolean,
  //   nullable: false,
  //   default: false,
  // }
];

export default filters;