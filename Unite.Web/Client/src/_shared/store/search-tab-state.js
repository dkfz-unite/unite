import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import FiltersContext from "@/_shared/components/filters/filters-context";

export function createSearchTabState(domain) {
  return {
    domain: domain,

    filtersCriteria: new FiltersCriteria(),
    filtersContext: new FiltersContext(),

    rows: [],
    rowsSelected: [],
    rowsTotal: 0
  }
}

class SearchTabState {
  domain = null;

  filtersCriteria = new FiltersCriteria();
  filtersContext = new FiltersContext();
  
  rows = [];
  rowsSelected = [];
  rowsTotal = 0;

  constructor(domain = null) {
    this.domain = domain;
  }
}

export default SearchTabState;