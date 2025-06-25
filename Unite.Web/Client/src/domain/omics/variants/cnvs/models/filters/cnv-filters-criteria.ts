import VariantFiltersCriteria from "../../../_shared/variants/models/filters/variant-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";

export default class CopyNumberVariantFiltersCriteria extends VariantFiltersCriteria {
  type = new ValuesCriteria<string>();
  del = new BoolCriteria();
  loh = new BoolCriteria();

  constructor(criteria: CopyNumberVariantFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.type = new ValuesCriteria<string>(criteria.type?.value);
    this.del = new BoolCriteria(criteria.del?.value);
    this.loh = new BoolCriteria(criteria.loh?.value);
  }

  clone() {
    let criteria = new CopyNumberVariantFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}