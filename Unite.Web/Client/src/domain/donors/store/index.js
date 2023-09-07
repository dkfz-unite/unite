import SearchPageStore from "@/_shared/store/search-page-store";
import DonorsApi from "../api";
import searchPageActions from "@/_shared/store/search-page-actions";
import createDomainActions from "@/domain/_shared/store/domain-actions";
import createCustomActions from "./actions";

const api = new DonorsApi("donors");

export default class DonorsStore extends SearchPageStore {
  actions = {
    ...searchPageActions,
    ...createDomainActions(api),
    ...createCustomActions(api),
  };

  constructor() {
    super("donors");
  }
}
