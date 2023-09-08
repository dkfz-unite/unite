import SearchTabState from "./search-tab-state.js";
import searchTabActions from "./search-tab-actions.js";

class SearchTabStore {
	namespaced = true;

	state = () => {};
	getters = {};
	actions = searchTabActions;

	constructor(domain = null) {
		this.state = () => new SearchTabState(domain);
	}
}

export default SearchTabStore;