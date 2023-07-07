import FilterType from "../../filter-type";
import ValueType from "../../filter-value-type";

import MgmtStatus from "@/_models/domain/specimens/enums/mgmt-status";
import IdhStatus from "@/_models/domain/specimens/enums/idh-status";
import IdhMutation from "@/_models/domain/specimens/enums/idh_mutation";
import GeneExpressionSubtype from "@/_models/domain/specimens/enums/gene-expression-subtype";
import MethylationSubtype from "@/_models/domain/specimens/enums/methylation-subtype";

import { mapOptions } from "../../filter-options-helpers";
import { sanitiseArray } from "../../filter-criteria-helpers";

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
    field: "referenceId",
    label: "External ID",
    placeholder: "e.g. SP1",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    group: "molecular",
    label: "Molecular Data",
    expand: false,
    filters: [
      {
        field: "mgmtStatus",
        label: "MGMT Status",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.mgmtStatusOptions, MgmtStatus.values)
      },
      {
        field: "idhStatus",
        label: "IDH Status",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.idhStatusOptions, IdhStatus.values),
        watch: (value, criteria, context) => {
          criteria.idhMutation = [];
          criteria.geneExpressionSubtype = [];
          criteria.methylationSubtype = [];
        }
      },
      {
        field: "idhMutation",
        label: "IDH Mutation",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.idhMutationOptions, IdhMutation.values),
        show: (value, criteria, context) => {
          return criteria.idhStatus?.length == 1 
              && criteria.idhStatus[0] == IdhStatus.Mutant;
        }
      },
      {
        field: "geneExpressionSubtype",
        label: "Gene Expression Subtype",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.idhMutationOptions, GeneExpressionSubtype.values),
        show: (value, criteria, context) => {
          return criteria.idhStatus?.length == 1 
              && criteria.idhStatus[0] == IdhStatus.WildType;
        }
      },
      {
        field: "methylationSubtype",
        label: "Methylation Subtype",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.idhMutationOptions, MethylationSubtype.values),
        show: (value, criteria, context) => {
          return criteria.idhStatus?.length == 1 
              && criteria.idhStatus[0] == IdhStatus.WildType;
        }
      },
      {
        field: "gCimpMethylation",
        label: "G-CIMP Methylation",
        type: FilterType.Boolean,
        default: null
      }
    ]
  },
  {
    group: "drugs",
    label: "Drug Screening",
    expand: false,
    filters: [
      {
        field: "drug",
        label: "Drug",
        type: FilterType.Values,
        valueType: ValueType.String,
      },
      {
        field: "dss",
        label: "DSS",
        type: FilterType.Range,
        valueType: ValueType.Number,
      },
      // {
      //   field: "dssSelective",
      //   label: "sDSS",
      //   type: FilterType.Range,
      //   valueType: ValueType.Number,
      // }
    ]
  }
];

export default filters;