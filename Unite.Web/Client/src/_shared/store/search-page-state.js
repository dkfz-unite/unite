import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import FiltersContext from "@/_shared/components/filters/filters-context";

class SearchPageState {
  filtersCriteria = new FiltersCriteria();
  filtersContext = new FiltersContext();
  
  rows = [];
  rowsSelected = [];
  rowsTotal = 0;
}

export default SearchPageState;