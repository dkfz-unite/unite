const SUFFIX = "cohorts";

function getNamespace(identity) {
  return `${identity}_${SUFFIX}`;
}

function loadCohorts(identity) {
  const json = localStorage.getItem(getNamespace(identity));
  return json ? JSON.parse(json) : null;
}

function saveCohorts(identity, cohorts){
  const json = JSON.stringify(cohorts);
  localStorage.setItem(getNamespace(identity), json);
}

function deleteCohorts(identity) {
  localStorage.removeItem(getNamespace(identity));
}

function saveCohort(identity, data) {
  let domains = loadCohorts(identity);
  if (!domains) {
    domains = [];
  }

  let domain = domains.find(domain => domain.name == data.domain);
  if (!domain) {
    domain = { name: data.domain, cohorts: [], index: 0 };
    domains.push(domain);
  }

  let cohort = domain.cohorts.find(cohort => cohort.name == data.name);
  if (!cohort) {
    cohort = {
      id: domain.index++,
      date: new Date().toJSON(),
      name: data.name,
      description: data.description,
      criteria: data.criteria,
      selection: data.selection
    };
    domain.cohorts.push(cohort);
    saveCohorts(identity, domains);
  }
}

function deleteCohort(identity, data) {
  let domains = loadCohorts(identity);
  let domain = domains?.find(domain => domain.name == data.domain);
  let cohort = domain?.cohorts?.find(cohort => cohort.name == data.cohort);

  if (cohort){
    domain.cohorts = domain.cohorts.filter(item => item.name != cohort.name);
    if (!domain.cohorts?.length) {
      domains = domains.filter(item => item.name != domain.name);
    }

    if (domains?.length) {
      saveCohorts(identity, domains);
    } else {
      deleteCohorts(identity);
    }
  }
}

function canSaveCohort(identity, domainName, cohortName) {
  let domains = loadCohorts(identity);

  return domains?.find(domain => domain.name == domainName)
       ?.cohorts?.find(cohort => cohort.name == cohortName) == null;
}

export default {
  loadCohorts,
  saveCohorts,
  deleteCohorts,
  saveCohort,
  deleteCohort,
  canSaveCohort
}