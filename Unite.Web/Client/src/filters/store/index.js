const ANONYM = "anonym";
const SUFFIX = "cohorts";

class FiltersStore {
  namespaced = true;

  state = () => ({
    namespace: `${ANONYM}-${SUFFIX}`,
    domains: [],
  });

  getters = {
    domains: (state) => {
      return state.domains;
    },

    domain: (state, getters) => (domainName) => {
      if (!domainName) return null;

      let domains = getters.domains;
      let domain = domains.find(domain => domain.name == domainName);
      
      if (!domain ) {
        domain = { name: domainName, cohorts: [] };
        domains.push(domain);
      }

      return domain;
    },

    cohorts: (state, getters) => (domainName) => {
      let domain = getters.domain(domainName);
      return domain.cohorts;
    },

    cohort: (state, getters) => (domainName, cohortName) => {
      if (!domainName) return null;
      if (!cohortName) return null;

      let cohorts = getters.cohorts(domainName);
      let cohort = cohorts?.find(cohort => cohort.name == cohortName);

      return cohort;
    }
  };

  actions = {
    initialize({state, dispatch}, identity) {
      const PREFIX = identity || ANONYM;
      state.namespace = `${PREFIX}-${SUFFIX}`;
      dispatch("loadDomains");
    },

    dispose({state, dispatch}) {
      let domains = state.domains;
      
      for (const i = 0; i < state.domains.length; i++) {
        if (!state.domains[i].cohorts.length) {
          domains = state.domains.filter(domain => domain.name !== state.domains[i].name);
        }
      }

      if (!domains.length) {
        dispatch("deleteDomains");
      }
    },

    loadDomains({state}) {
      const json = localStorage.getItem(state.namespace);
      state.domains = json ? JSON.parse(json) : [];
    },

    saveDomains({state}) {
      const json = JSON.stringify(state.domains);
      localStorage.setItem(state.namespace, json);
    },

    deleteDomains({state}) {
      localStorage.removeItem(state.namespace);
    },

    addCohort({state, getters, dispatch}, {domainName, cohortData}) {
      let cohorts = getters.cohorts(domainName);
      let cohort = getters.cohort(domainName, cohortData.name);
      
      if (!cohort) {        
        cohort = {
          date: new Date().toJSON(),
          name: cohortData.name,
          description: cohortData.description,
          criteria: cohortData.criteria,
          selection: cohortData.selection
        };

        cohorts.push(cohort);
        dispatch("saveDomains");
      }
    },

    deleteCohort({state, getters, dispatch}, {domainName, cohortName}) {
      let domain = getters.domain(domainName);
      
      domain.cohorts = domain.cohorts.filter(cohort => cohort.name !== cohortName)
      dispatch("saveDomains");
    }
  };
}

export default FiltersStore;