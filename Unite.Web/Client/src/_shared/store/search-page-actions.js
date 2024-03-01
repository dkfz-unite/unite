import searchTabActions from "./search-tab-actions.js";
import cohortActions from "./cohort-actions.js";
import datasetActions from "@/datasets/store/actions.js";

const actions = {
  ...searchTabActions,
  ...cohortActions,
  ...datasetActions
}

export default actions;