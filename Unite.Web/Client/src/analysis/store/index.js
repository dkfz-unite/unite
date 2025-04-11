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
  id: "Analysis identifier", // generated by the backend upon creation, duplicates map key
  name: "Analysis Name", // optional, can be provided by the user
  description: "Analysis description", // optional, can be provided by the user
  type: "don-sce|meth-dm|rna-de/rnasc-dc", // analysis type (dExp, etc.)
  status: "Preparing", // analysis status (Preparing, Prepared, Processing, Processed)
  date: new Date(), // analysis date
  parameters: { // analysis parameters
    //...
  },
  data: { // analysis data
    //...
    datasets: [ // datasets used in the analysis
      {
        id: "Dataset identifier", // generated by the backend upon creation
        name: "Dataset Name", // dataset name, provided by the user upon creation
        domain: "Donors", // dataset domain data domain (Donors, Mrs, Materials, etc.)
        criteria: { // dataset criteria
          //...
        },
      }
    ],
  }
};
*/
