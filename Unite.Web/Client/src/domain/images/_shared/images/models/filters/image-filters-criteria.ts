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
  }

  clone() {
    let criteria = new ImageFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}