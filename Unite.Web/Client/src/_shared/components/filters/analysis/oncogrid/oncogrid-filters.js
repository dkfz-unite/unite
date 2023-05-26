import FilterType from "../../filter-type";
// import ValueType from "../../filter-value-type";

import { MAX_GENES, MAX_DONORS, DEFAULT_GENES, DEFAULT_DONORS } from "./oncogrid-filters-criteria";

// import { mapOptions } from "../../filter-options-helpers";
// import { sanitiseArray, sanitiseRange } from "../../filter-criteria-helpers";

const filters = [
  {
    field: "numberOfDonors",
    label: `Donors (max ${MAX_DONORS})`,
    placeholder: "e.g. 200",
    type: FilterType.Number,
    // valueType: ValueType.Number,
    default: DEFAULT_DONORS
    // sanitize: (value) => sanitiseArray(value, true)
  },
  {
    field: "numberOfGenes",
    label: `Genes (max ${MAX_GENES})`,
    placeholder: "e.g. 50",
    type: FilterType.Number,
    // valueType: ValueType.String,
    default: DEFAULT_GENES
    // sanitize: (value) => sanitiseArray(value)
  }
];

export default filters;