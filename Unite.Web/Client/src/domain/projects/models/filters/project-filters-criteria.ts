import { sanitiseArray, sanitiseRange, sanitiseThreshold, copy } from "@/_shared/components/filters/filter-criteria-helpers";
import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";

export default class ProjectFiltersCriteria extends FiltersCriteriaBase {
  id = new ValuesCriteria<number>();
  name = new ValuesCriteria<string>();

  hasSms = new BoolCriteria();
  hasCnvs = new BoolCriteria();
  hasSvs = new BoolCriteria();
  hasExp = new BoolCriteria();
  hasExpSc = new BoolCriteria();

  constructor(criteria: ProjectFiltersCriteria | null = null) {
    super();
  }

  clone() {
    let criteria = new ProjectFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}