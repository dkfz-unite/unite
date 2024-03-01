import SearchPageState, { createSearchPageState} from "./search-page-state.js";
import searchPageGetters from "./search-page-getters.js";
import searchPageActions from "./search-page-actions.js";

class SearchPageStore {
	namespaced = true;

	state = () => {};
	getters = searchPageGetters;
	actions = searchPageActions;

	constructor(domain = null) {;
		this.state = () => new SearchPageState(domain);
	}
}

export function createSearchPageStore(domain) {
	return {
		namespaced: true,
		
		state: createSearchPageState(domain),
		getters: searchPageGetters,
		actions: searchPageActions
	}
}

export default SearchPageStore;