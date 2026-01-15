import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";

export default class MaterialFiltersCriteria extends SpecimenFiltersCriteria {
  fixationType = new ValuesCriteria<string>();
  source = new ValuesCriteria<string>();

  constructor(criteria: MaterialFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.fixationType = new ValuesCriteria<string>(criteria.fixationType);
    this.source = new ValuesCriteria<string>(criteria.source);
  }

  clone() : MaterialFiltersCriteria {
    return new MaterialFiltersCriteria(this);
  }
}