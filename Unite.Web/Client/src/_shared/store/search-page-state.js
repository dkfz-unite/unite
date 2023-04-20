import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import FiltersContext from "@/_shared/components/filters/filters-context";

class SearchPageState {
  filtersCriteria = new FiltersCriteria();
  filtersContext = new FiltersContext();
  
  rows = [];
  rowsTotal = 0;
  rowsSelected = [];
}

export default SearchPageState;