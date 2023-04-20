import FiltersContext from "../components/filters/filters-context.js";
import FiltersCriteria from "../components/filters/filters-criteria.js";
import SearchPageState from "./search-page-state.js";

class SearchPageStore {
	namespaced = true;

	state = () => new SearchPageState();

	actions = {
		clear({state}) {
			state.filtersCriteria = new FiltersCriteria();
			state.filtersContext = new FiltersContext();
			state.rows = [];
			state.rowsTotal = 0;
			state.rowsSelected = [];
		}
	}
}

export default SearchPageStore;