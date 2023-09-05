import SearchPageStore from "@/_shared/store/search-page-store";
import createActions from "@/domain/_shared/store/domain-actions";

const domain = "donors";

export default class DonorsStore extends SearchPageStore {
  actions = createActions(domain);

  constructor() {
    super(domain);
  }
}
