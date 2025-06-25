import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";

export default class OrganoidFiltersCriteria extends SpecimenFiltersCriteria {
  medium = new ValuesCriteria<string>();
  tumorigenicity = new BoolCriteria();
  intervention = new ValuesCriteria<string>();

  constructor(criteria: OrganoidFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.medium = new ValuesCriteria<string>(criteria.medium?.value);
    this.tumorigenicity = new BoolCriteria(criteria.tumorigenicity?.value);
    this.intervention = new ValuesCriteria<string>(criteria.intervention?.value);
  }

  clone() {
    let criteria = new OrganoidFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}