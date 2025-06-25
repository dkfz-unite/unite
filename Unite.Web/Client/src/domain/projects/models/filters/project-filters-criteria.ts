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

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id?.value);
    this.name = new ValuesCriteria<string>(criteria.name?.value);

    this.hasSms = new BoolCriteria(criteria.hasSms?.value);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs?.value);
    this.hasSvs = new BoolCriteria(criteria.hasSvs?.value);
    this.hasExp = new BoolCriteria(criteria.hasExp?.value);
    this.hasExpSc = new BoolCriteria(criteria.hasExpSc?.value);
  }

  clone() {
    let criteria = new ProjectFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}