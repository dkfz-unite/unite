import FilterType from "../../filter-type";
import ValueType from "../../filter-value-type";

import Gender from "../../../../../_models/domain/donors/enums/gender";
import VitalStatus from "../../../../../_models/domain/donors/enums/vital-status";
import ProgressionStatus from "../../../../../_models/domain/donors/enums/progression-status";

import { mapOptions } from "../../filter-options-helpers";
import { sanitiseArray, sanitiseRange, sanitiseThreshold } from "../../filter-criteria-helpers";

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
    field: "project",
    label: "Project",
    placeholder: "e.g. PBCA-DE",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value),
    // show: (value, criteria, context) => criteria.mtaProtected == true
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
    field: "gender",
    label: "Sex",
    type: FilterType.Options,
    valueType: ValueType.String,
    options: (context) => mapOptions(context?.genderOptions, Gender.values)
  },
  {
    field: "age",
    // label: "Age",
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
    field: "vitalStatus",
    label: "Vital Status",
    type: FilterType.Option,
    valueType: ValueType.Boolean,
    options: (context) => mapOptions(context?.vitalStatusOptions, VitalStatus.values)
  },
  {
    field: "vitalStatusChangeDay",
    labelFrom: "Survival Revised After (From)",
    labelTo: " Survival Revised After (To)",
    placeholderFrom: "e.g. 100 days",
    placeholderTo: "e.g. 300 days",
    type: FilterType.Range,
    valueType: ValueType.Number,
    expandable: false,
    sanitize: (value) => sanitiseRange(value)
  },
  {
    field: "progressionStatus",
    label: "Progression Status",
    type: FilterType.Option,
    valueType: ValueType.Boolean,
    options: (context) => mapOptions(context?.vitalStatusOptions, ProgressionStatus.values),
    // watch: (value, criteria, context) => {
    //   criteria.progressionStatusChangeDay = null;
    // }
  },
  {
    field: "progressionStatusChangeDay",
    labelFrom: "Progression Revised After (From)",
    labelTo: "Progression Revised After (To)",
    placeholderFrom: "e.g. 100 days",
    placeholderTo: "e.g. 300 days",
    type: FilterType.Range,
    valueType: ValueType.Number,
    expandable: false,
    sanitize: (value) => sanitiseRange(value),
    // show: (value, criteria, context) => criteria.progressionStatus != null
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
    field: "mtaProtected",
    label: "MTA Protected",
    type: FilterType.Boolean,
    default: null,
    // watch: (value, criteria, context) => {
    //   criteria.workPackage = [];
    // }
  }
];

export default filters;