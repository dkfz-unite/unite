import getters from "./getters";
import actions from "./actions";

export default class AnalysisStore {
  namespaced = true;

  state = {
    analyses: new Map(),
    token: null,
  };

  getters = { ...getters };

  actions = { ...actions };
}

/*
const analysisExample = {
  key: "analysis-key", // generated by the back-end, duplicates map key
  name: "Analysis Name", // optional, can be provided by the user
  description: "Analysis description", // optional, can be provided by the user
  type: "dExp", // analysis type (dExp, etc.)
  status: "Preparing", // analysis status (Preparing, Prepared, Processing, Processed)
  date: new Date(), // analysis date
  parameters: { // analysis parameters
    //...
  },
  data: { // analysis data
    //...
    datasets: [ // datasets used in the analysis
      {
        key: "dataset-key", // dataset key, generated on the front-end upon creation
        name: "Dataset Name", // dataset name, provided by the user upon creation
        domain: "Donors", // dataset domain data domain (Donors, Mris, Materials, etc.)
        criteria: { // dataset criteria
          //...
        },
      }
    ],
  }
};
*/
