import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";

export default class ImageFiltersCriteria extends FiltersCriteriaBase {
  id = new ValuesCriteria<number>();
  referenceId = new ValuesCriteria<string>();

  hasSms = new BoolCriteria();
  hasCnvs = new BoolCriteria();
  hasSvs = new BoolCriteria();
  hasMeth = new BoolCriteria();
  hasExp = new BoolCriteria();
  hasExpSc = new BoolCriteria();

  constructor(criteria: ImageFiltersCriteria | null = null) {
    super();

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id?.value);
    this.referenceId = new ValuesCriteria<string>(criteria.referenceId?.value);

    this.hasSms = new BoolCriteria(criteria.hasSms?.value);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs?.value);
    this.hasSvs = new BoolCriteria(criteria.hasSvs?.value);
    this.hasMeth = new BoolCriteria(criteria.hasMeth?.value);
    this.hasExp = new BoolCriteria(criteria.hasExp?.value);
    this.hasExpSc = new BoolCriteria(criteria.hasExpSc?.value);
  }

  clone() {
    let criteria = new ImageFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}