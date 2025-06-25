import VariantFiltersCriteria from "../../../_shared/variants/models/filters/variant-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";

export default class MutationFiltersCriteria extends VariantFiltersCriteria {
  type = new ValuesCriteria<string>();

  constructor(criteria: MutationFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.type = new ValuesCriteria<string>(criteria.type?.value);
  }

  clone() {
    let criteria = new MutationFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}