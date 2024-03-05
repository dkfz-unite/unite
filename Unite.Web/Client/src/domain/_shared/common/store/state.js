import FiltersContext from "@/_shared/components/filters/filters-context.js";
import FiltersCriteria from "@/_shared/components/filters/filters-criteria.js";

function createState(domain = null) {
  return {
    domain: domain,

    filtersCriteria: new FiltersCriteria(),
    filtersContext: new FiltersContext(),

    rows: [],
    rowsSelected: [],
    rowsTotal: 0
  }
}

export default createState;