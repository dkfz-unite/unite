import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";

export default class MaterialFiltersCriteria extends SpecimenFiltersCriteria {
  type = new ValuesCriteria<string>();
  fixationType = new ValuesCriteria<string>();
  tumorType = new ValuesCriteria<string>();
  tumorGrade = new RangeCriteria();
  source = new ValuesCriteria<string>();

  constructor(criteria: MaterialFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.type = new ValuesCriteria<string>(criteria.type);
    this.fixationType = new ValuesCriteria<string>(criteria.fixationType);
    this.tumorType = new ValuesCriteria<string>(criteria.tumorType);
    this.tumorGrade = new RangeCriteria(criteria.tumorGrade);
    this.source = new ValuesCriteria<string>(criteria.source);
  }

  clone() {
    let criteria = new MaterialFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}