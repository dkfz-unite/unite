import FilterType from "../../filter-type";
import ValueType from "../../filter-value-type";

import Gender from "../../../../../_models/domain/donors/enums/gender";
import VitalStatus from "../../../../../_models/domain/donors/enums/vital-status";

import { mapOptions } from "../../filter-options-helpers";
import { sanitiseArray, sanitiseRange } from "../../filter-criteria-helpers";

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
    field: "therapy",
    label: "Therapy",
    placeholder: "e.g. Temodal therapy",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value)
  },
  {
    field: "vitalStatus",
    label: "Vital Status",
    type: FilterType.Option,
    valueType: ValueType.Boolean,
    options: (context) => mapOptions(context?.vitalStatusOptions, VitalStatus.values)
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
    label: "Age",
    placeholderFrom: "e.g. 50",
    placeholderTo: "e.g. 70",
    type: FilterType.Range,
    valueType: ValueType.Number,
    sanitize: (value) => sanitiseRange(value)
  },
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
    field: "projects",
    label: "Projects",
    placeholder: "e.g. N2M2",
    type: FilterType.Values,
    valueType: ValueType.String,
    sanitize: (value) => sanitiseArray(value),
    // show: (value, criteria, context) => criteria.mtaProtected == true
  }
];

export default filters;