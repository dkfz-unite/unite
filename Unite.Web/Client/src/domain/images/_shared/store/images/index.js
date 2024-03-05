import SearchPageStore from "@/_shared/store/search-page-store";
import ImagesApi from "../../api/images";
import searchPageActions from "@/_shared/store/search-page-actions";
import createDomainActions from "@/domain/_shared/store/domain-actions";
import createCustomActions from "./actions";

const api = null; //new ImagesApi("mri");

export default class ImageStore extends SearchPageStore {
  // actions = {
  //   ...searchPageActions,
  //   ...createDomainActions(api),
  //   ...createCustomActions(api),
  // };

  constructor(type) {
    super(type);
    
    api = new ImagesApi(type.substring(-1));
    
    this.actions = {
      ...searchPageActions,
      ...createDomainActions(api),
      ...createCustomActions(api),
    };
  }
}
