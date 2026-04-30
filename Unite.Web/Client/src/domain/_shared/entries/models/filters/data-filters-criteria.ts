import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";

export default abstract class DataFiltersCriteria extends FiltersCriteriaBase {
  hasSms = new BoolCriteria();
  hasCnvs = new BoolCriteria();
  hasSvs = new BoolCriteria();
  hasMeth = new BoolCriteria();
  hasExp = new BoolCriteria();
  hasExpSc = new BoolCriteria();
  hasProt = new BoolCriteria();

  constructor(criteria: DataFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.hasSms = new BoolCriteria(criteria.hasSms);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs);
    this.hasSvs = new BoolCriteria(criteria.hasSvs);
    this.hasMeth = new BoolCriteria(criteria.hasMeth);
    this.hasExp = new BoolCriteria(criteria.hasExp);
    this.hasExpSc = new BoolCriteria(criteria.hasExpSc);
    this.hasProt = new BoolCriteria(criteria.hasProt);
  }
}
