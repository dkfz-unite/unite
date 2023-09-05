import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import FiltersContext from "@/_shared/components/filters/filters-context";

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