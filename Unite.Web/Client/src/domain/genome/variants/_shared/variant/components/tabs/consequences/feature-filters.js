import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";

// import Chromosome from "@/_models/domain/genome/enums/chromosome";

// import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "@/_shared/components/filters/filter-criteria-helpers";

const filters = [
  // {
  //   field: "type",
  //   label: "Type",
  //   placeholder: "e.g. Transcript",
  //   type: FilterType.Values,
  //   valueType: ValueType.String,
  //   sanitize: (value) => sanitiseArray(value)
  // },
  // {
  //   field: "group",
  //   label: "Group",
  //   type: FilterType.Boolean,
  //   nullable: false
  // },
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
      // {
      //   field: "chromosome",
      //   label: "Chromosome",
      //   type: FilterType.Options,
      //   valueType: ValueType.String,
      //   options: (context) => mapOptions(context?.chromosomeOptions, Chromosome.values),
      //   watch: (value, criteria, context) => {
      //     criteria.position = { from: null, to: null };
      //   }
      // },
      {
        field: "position",
        label: "Position",
        expandable: false,
        placeholderFrom: "e.g. 100100",
        placeholderTo: "e.g. 100900",
        type: FilterType.Range,
        valueType: ValueType.Number,
        sanitize: (value) => sanitiseRange(value),
        // show: (value, criteria, context) => criteria.chromosome?.length == 1
      }
    ]
  },
  // {
  //   group: "consequences",
  //   label: "Consequences",
  //   filters: [
  //     {
  //       field: "impact",
  //       label: "Impact",
  //       type: FilterType.Options,
  //       valueType: ValueType.String,
  //       options: (context) => mapOptions(context?.impactOptions, ConsequenceImpact.values)
  //     },
  //     {
  //       field: "consequence",
  //       label: "Consequence",
  //       type: FilterType.Options,
  //       valueType: ValueType.String,
  //       options: (context) => mapOptions(context?.consequenceOptions, ConsequenceType.values)
  //     }
  //   ]
  // }
];

export default filters;