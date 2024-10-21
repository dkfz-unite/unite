import Chromosome from "../enums/chromosome";
import EffectImpact from "../enums/effect-impact";
import EffectType from "../enums/effect-type";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "@/_shared/components/filters/filter-criteria-helpers";

const filters = [
  {
    field: "gene",
    label: "Gene",
    placeholder: "e.g. TTN",
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
    group: "effects",
    label: "Effects",
    filters: [
      {
        field: "impact",
        label: "Impact",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.effectImpactOptions, EffectImpact.values)
      },
      {
        field: "effect",
        label: "Effect",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.effectTypeOptions, EffectType.values)
      }
    ]
  }
];

export default filters;