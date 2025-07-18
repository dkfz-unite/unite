import VariantFiltersCriteria from "../../../_shared/variants/models/filters/variant-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";

export default class CnvFiltersCriteria extends VariantFiltersCriteria {
  type = new ValuesCriteria<string>();
  del = new BoolCriteria();
  loh = new BoolCriteria();

  constructor(criteria: CnvFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.type = new ValuesCriteria<string>(criteria.type);
    this.del = new BoolCriteria(criteria.del);
    this.loh = new BoolCriteria(criteria.loh);
  }

  clone() {
    let criteria = new CnvFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}