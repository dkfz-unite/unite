import SearchPageStore from "@/_shared/store/search-page-store";
import createActions from "@/domain/_shared/store/domain-actions";

export default class DomainStore extends SearchPageStore {
  constructor(domainName, domainUrl) {
    super(domainName);
    this.actions = createActions(domainUrl);
  }
}
