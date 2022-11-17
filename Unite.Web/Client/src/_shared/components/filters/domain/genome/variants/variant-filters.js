import FilterType from "../../../filter-type";
import ValueType from "../../../filter-value-type";

import Chromosome from "@/_models/domain/genome/enums/chromosome";
import ConsequenceImpact from "@/_models/domain/genome/variants/enums/consequence-impact";
import ConsequenceType from "@/_models/domain/genome/variants/enums/consequence-type";

import { mapOptions } from "../../../filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "../../../filter-criteria-helpers";

const filters = [
  {
    field: "id",
    label: "ID",
    placeholder: "e.g. SSM11033",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
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
        options: (context) => mapOptions(context?.impactOptions, ConsequenceImpact.values)
      },
      {
        field: "consequence",
        label: "Consequence",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.consequenceOptions, ConsequenceType.values)
      }
    ]
  }
];

export default filters;