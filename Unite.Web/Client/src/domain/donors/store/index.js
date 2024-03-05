import SearchPageStore from "@/_shared/store/search-page-store";
import Settings from "../settings";
import DonorsApi from "../api";
import searchPageActions from "@/_shared/store/search-page-actions";
import createDomainActions from "@/domain/_shared/store/domain-actions";
import createCustomActions from "./actions";

const api = new DonorsApi(Settings.domain);

export default class DonorsStore extends SearchPageStore {
  actions = {
    ...searchPageActions,
    ...createDomainActions(api),
    ...createCustomActions(api),
  };

  constructor() {
    super(Settings.domain);
  }
}
