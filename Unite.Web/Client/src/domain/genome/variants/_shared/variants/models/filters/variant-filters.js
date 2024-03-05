import Chromosome from "../enums/chromosome";
import ConsequenceImpact from "../enums/consequence-impact";
import ConsequenceType from "../enums/consequence-type";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseRange } from "@/_shared/components/filters/filter-criteria-helpers";

const filters = [
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
  {
    field: "length",
    label: "Length",
    expandable: true,
    placeholderFrom: "e.g. 100",
    placeholderTo: "e.g. 1000",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value),
  },
  {
    group: "consequences",
    label: "Consequences",
    filters: [
      {
        field: "impact",
        label: "Impact",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.consequenceImpactOptions, ConsequenceImpact.values)
      },
      {
        field: "consequence",
        label: "Consequence",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.consequenceTypeOptions, ConsequenceType.values)
      }
    ]
  }
];

export default filters;