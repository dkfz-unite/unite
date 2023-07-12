import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import FiltersContext from "@/_shared/components/filters/filters-context";

class SearchPageState {
  domain = null;

  filtersCriteria = new FiltersCriteria();
  filtersContext = new FiltersContext();
  
  rows = [];
  rowsSelected = [];
  rowsTotal = 0;

  cohorts = [];

  constructor(domain = null) {
    this.domain = domain;
  }
}

export default SearchPageState;