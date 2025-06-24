import VariantFiltersCriteria from "../../../_shared/variants/models/filters/variant-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";

export default class StructuralVariantFiltersCriteria extends VariantFiltersCriteria {
  type = new ValuesCriteria<string>();

  constructor(criteria: StructuralVariantFiltersCriteria | null = null) {
    super(criteria);
  }

  clone() {
    let criteria = new StructuralVariantFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}