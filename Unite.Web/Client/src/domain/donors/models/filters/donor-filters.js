import Sex from "../enums/sex";
import VitalStatus from "../enums/vital-status";
import ProgressionStatus from "../enums/progression-status";

import FilterType from "@/_shared/components/filters/filter-type";
import ValueType from "@/_shared/components/filters/filter-value-type";
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";
import { sanitiseArray, sanitiseRange, sanitizeString, sanitiseThreshold } from "@/_shared/components/filters/filter-criteria-helpers";

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
    placeholder: "e.g. DO1",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "diagnosis",
    label: "Diagnosis",
    placeholder: "e.g. Glioblastoma",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "primarySite",
    label: "Primary Site",
    placeholder: "e.g. Brain",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "localization",
    label: "Localization",
    placeholder: "e.g. Frontal Lobe",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "sex",
    label: "Sex",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.sexOptions, Sex.values)
  },
  {
    field: "age",
    label: "Age",
    labelFrom: "Age (From)",
    labelTo: "Age (To)",
    placeholderFrom: "e.g. 50",
    placeholderTo: "e.g. 70",
    type: FilterType.Range,
    valueType: ValueType.Number,
    expandable: false,
    sanitize: (value) => sanitiseRange(value)
  },
  {
    field: "therapy",
    label: "Therapy",
    placeholder: "e.g. Temodal therapy",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    group: "survival",
    label: "Survival",
    expand: false,
    filters: [
      {
        field: "vitalStatus",
        label: "Vital Status",
        type: FilterType.Option,
        valueType: ValueType.Boolean,
        options: (context) => mapOptions(context?.vitalStatusOptions, VitalStatus.values)
      },
      {
        field: "vitalStatusChangeDay",
        label: "Survival (Days)",
        labelFrom: "Survival (From)",
        labelTo: " Survival (To)",
        placeholderFrom: "e.g. 100 days",
        placeholderTo: "e.g. 300 days",
        type: FilterType.Range,
        valueType: ValueType.Number,
        expandable: false,
        sanitize: (value) => sanitiseRange(value)
      },
    ]
  },
  {
    group: "progression",
    label: "Progression",
    expand: false,
    filters: [
      {
        field: "progressionStatus",
        label: "Progression Status",
        type: FilterType.Option,
        valueType: ValueType.Boolean,
        options: (context) => mapOptions(context?.progressionStatusOptions, ProgressionStatus.values),
        // watch: (value, criteria, context) => {
        //   criteria.progressionStatusChangeDay = null;
        // }
      },
      {
        field: "progressionStatusChangeDay",
        label: "Progression Free Survival (Days)",
        labelFrom: "Progression Free Survival (From)",
        labelTo: "Progression Free Survival (To)",
        placeholderFrom: "e.g. 100 days",
        placeholderTo: "e.g. 300 days",
        type: FilterType.Range,
        valueType: ValueType.Number,
        expandable: false,
        sanitize: (value) => sanitiseRange(value),
        // show: (value, criteria, context) => criteria.progressionStatus != null
      },
    ]
  },
  {
    group: "project",
    label: "Project",
    expand: false,
    filters: [
      {
        field: "mtaProtected",
        label: "MTA Protected",
        type: FilterType.Boolean,
        default: null,
        // watch: (value, criteria, context) => {
        //   criteria.workPackage = [];
        // }
      },
      {
        field: "project",
        label: "Project",
        placeholder: "e.g. PBCA-DE",
        type: FilterType.Values,
        valueType: ValueType.String,
        sanitize: (value) => sanitiseArray(value),
        // show: (value, criteria, context) => criteria.mtaProtected == true
      },
      {
        field: "study",
        label: "Study",
        placeholder: "e.g. PCAWG",
        type: FilterType.Values,
        valueType: ValueType.String,
        sanitize: (value) => sanitiseArray(value),
        // show: (value, criteria, context) => criteria.mtaProtected == true
      },
    ]
  },
  
];

export default filters;