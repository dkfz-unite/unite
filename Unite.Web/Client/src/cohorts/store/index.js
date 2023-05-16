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

      return domain;
    },

    cohorts: (state, getters) => (domainName) => {
      let domain = getters.domain(domainName);
      return domain?.cohorts;
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
      const domains = state.domains.filter(domain => domain.cohorts.length);
      
      state.domains = domains;
      dispatch("saveDomains");
    },

    loadDomains({state}) {
      const json = localStorage.getItem(state.namespace);
      state.domains = json ? JSON.parse(json) : [];
    },

    saveDomains({state}) {
      if (state.domains.length) {
        const json = JSON.stringify(state.domains);
        localStorage.setItem(state.namespace, json);
      } else {
        localStorage.removeItem(state.namespace);
      }
    },

    addCohort({state, getters, dispatch}, {domainName, cohortData}) {
      let domain = getters.domain(domainName);

      if (!domain) {
        domain = { name: domainName, cohorts: [] };
        state.domains.push(domain);
      }

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
      
      domain.cohorts = domain.cohorts.filter(cohort => cohort.name !== cohortName);

      if (!domain.cohorts.length) {
        state.domains = state.domains.filter(domain => domain.name !== domainName);
      }

      dispatch("saveDomains");
    }
  };
}

export default FiltersStore;