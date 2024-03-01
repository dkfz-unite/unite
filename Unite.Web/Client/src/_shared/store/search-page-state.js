import SearchTabState, { createSearchTabState } from "./search-tab-state";
import datasetsState from "@/datasets/store/state";

export function createSearchPageState(domain) {
  return {
    cohorts: [],
    ...datasetsState,
    ...createSearchTabState(domain)
  }
}

class SearchPageState extends SearchTabState {
  cohorts = [];
}

export default SearchPageState;