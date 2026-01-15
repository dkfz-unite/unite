import ConditionType from "../enums/condition-type";
import TumorType from "../enums/tumor-type";
import IdhMutation from "../enums/idh_mutation";
import TertMutation from "../enums/tert-mutation";
import ExpressionSubtype from "../enums/expression-subtype";
import MethylationSubtype from "../enums/methylation-subtype";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray } from "@/_shared/components/filters/filter-criteria-helpers";

const specimen = [
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
    field: "condition",
    label: "Condition",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.conditionOptions, ConditionType.values),
    watch: (value, criteria, context) => {
      criteria.tumorType.value = [];
      // criteria.tumorGrade.value = null;
    }
  },
  {
    field: "tumorType",
    label: "Tumor Type",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.tumorTypeOptions, TumorType.values),
    show: (value, criteria, context) => {
      return criteria.condition?.value?.length == 1 
          && criteria.condition.value[0] == ConditionType.Tumor;
    }
  },
  {
    field: "tumorGrade",
    label: "Tumor Grade",
    labelFrom: "Tumor Grade (From)",
    labelTo: "Tumor Grade (To)",
    placeholderFrom: "e.g. 1",
    placeholderTo: "e.g. 5",
    type: FilterType.Range,
    valueType: ValueType.Number,
    expandable: false,
    sanitize: (value) => sanitiseRange(value),
    show: (value, criteria, context) => {
      return criteria.condition?.value?.length == 1 
          && criteria.condition.value[0] == ConditionType.Tumor;
    }
  }
];

const classification = [
  {
    group: "classification",
    label: "Tumor Classification",
    expand: false,
    show: (value, criteria, context) => {
      return criteria.condition?.value?.length == 1 
          && criteria.condition.value[0] == ConditionType.Tumor;
    },
    filters: [
      {
        field: "tumorSuperfamily",
        label: "Superfamily",
        type: FilterType.Values,
        valueType: ValueType.String,
        sanitize: (value) => sanitiseArray(value)
      },
      {
        field: "tumorFamily",
        label: "Family",
        type: FilterType.Values,
        valueType: ValueType.String,
        sanitize: (value) => sanitiseArray(value)
      },
      {
        field: "tumorClass",
        label: "Class",
        type: FilterType.Values,
        valueType: ValueType.String,
        sanitize: (value) => sanitiseArray(value)
      },
      {
        field: "tumorSubclass",
        label: "Subclass",
        type: FilterType.Values,
        valueType: ValueType.String,
        sanitize: (value) => sanitiseArray(value)
      }
    ]
  }
];

const molecular = [
  {
    group: "molecular",
    label: "Molecular Data",
    expand: false,
    filters: [
      {
        field: "mgmtStatus",
        label: "MGMT Methylated",
        type: FilterType.Boolean,
        default: null
      },
      {
        field: "idhStatus",
        label: "IDH Mutated",
        type: FilterType.Boolean,
        default: null,
        watch: (value, criteria, context) => {
          criteria.idhMutation.value = [];
        }
      },
      {
        field: "idhMutation",
        label: "IDH Mutation",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.idhMutationOptions, IdhMutation.values),
        show: (value, criteria, context) => {
          return criteria.idhStatus.value == true;
        }
      },
      {
        field: "tertStatus",
        label: "TERT Mutated",
        type: FilterType.Boolean,
        default: null,
        watch: (value, criteria, context) => {
          criteria.tertMutation.value = [];
        }
      },
      {
        field: "tertMutation",
        label: "TERT Mutation",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.tertMutationOptions, TertMutation.values),
        show: (value, criteria, context) => {
          return criteria.tertStatus.value == true;
        }
      },
      {
        field: "expressionSubtype",
        label: "Expression Subtype",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.expressionSubtypeOptions, ExpressionSubtype.values)
      },
      {
        field: "methylationSubtype",
        label: "Methylation Subtype",
        type: FilterType.Options,
        valueType: ValueType.String,
        options: (context) => mapOptions(context?.methylationSubtypeOptions, MethylationSubtype.values)
      },
      {
        field: "gCimpMethylation",
        label: "G-CIMP Methylation",
        type: FilterType.Boolean,
        default: null
      },
      {
        field: "geneKnockout",
        label: "Gene Knockouts",
        placeholder: "e.g. TTN, EGFR",
        type: FilterType.Values,
        valueType: ValueType.String,
        sanitize: (value) => sanitiseArray(value)
      }
    ]
  }
];

const drugs = [
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

const all = [
  ...specimen,
  ...classification,
  ...molecular,
  ...drugs
];

export default all;

export {
  specimen,
  classification,
  molecular,
  drugs,
  all
};