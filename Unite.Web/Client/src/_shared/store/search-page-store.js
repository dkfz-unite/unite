import SearchPageState from "./search-page-state.js";
import searchPageGetters from "./search-page-getters.js";
import searchPageActions from "./search-page-actions.js";

class SearchPageStore {
	namespaced = true;

	state = () => {};
	getters = {};
	actions = {};

	constructor(domain = null) {
		this.state = () => new SearchPageState(domain);
		this.getters = searchPageGetters;
		this.actions = searchPageActions;
	}
}

export default SearchPageStore;