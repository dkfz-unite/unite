import FilterType from "../../../filter-type";
import ValueType from "../../../filter-value-type";

import Chromosome from "../../../../../../_models/domain/genome/enums/chromosome";
import SequenceType from "../../../../../../_models/domain/genome/mutations/enums/sequence-type";
import MutationType from "../../../../../../_models/domain/genome/mutations/enums/mutation-type";
import ConsequenceImpact from "../../../../../../_models/domain/genome/mutations/enums/consequence-impact";
import ConsequenceType from "../../../../../../_models/domain/genome/mutations/enums/consequence-type";

import { mapOptions } from "../../../filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "../../../filter-criteria-helpers";

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
    field: "code",
    label: "Code",
    placeholder: "e.g. chr2:g.179454479G>A",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "sequenceType",
    label: "Sequence Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.sequenceTypeOptions, SequenceType.values),
    show: (value, criteria, context) => false
  },
  {
    field: "mutationType",
    label: "Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.mutationTypeOptions, MutationType.values)
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
  //   field: "chromosome",
  //   label: "Chromosome",
  //   type: FilterType.Options,
  //   valueType: ValueType.String,
  //   options: (context) => mapOptions(context?.chromosomeOptions, Chromosome.values),
  //   watch: (value, criteria, context) => {
  //     criteria.position = { from: null, to: null };
  //   }
  // },
  // {
  //   field: "position",
  //   label: "Position",
  //   type: FilterType.Range,
  //   valueType: ValueType.Number,
  //   sanitize: (value) => sanitiseRange(value),
  //   show: (value, criteria, context) => criteria.chromosome?.length == 1
  // },
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
  },
  // {
  //   field: "impact",
  //   label: "Impact",
  //   type: FilterType.Options,
  //   valueType: ValueType.String,
  //   options: (context) => mapOptions(context?.impactOptions, ConsequenceImpact.values)
  // },
  // {
  //   field: "consequence",
  //   label: "Consequence",
  //   type: FilterType.Options,
  //   valueType: ValueType.String,
  //   options: (context) => mapOptions(context?.consequenceOptions, ConsequenceType.values)
  // }
];

export default filters;