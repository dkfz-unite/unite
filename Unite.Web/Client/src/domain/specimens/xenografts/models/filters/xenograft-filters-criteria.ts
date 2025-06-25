import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";

export default class XenograftFiltersCriteria extends SpecimenFiltersCriteria {
  mouseStrain = new ValuesCriteria<string>();
  survivalDays = new RangeCriteria();
  tumorigenicity = new BoolCriteria();
  tumorGrowthForm = new ValuesCriteria<string>();
  intervention = new ValuesCriteria<string>();

  constructor(criteria: XenograftFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.mouseStrain = new ValuesCriteria<string>(criteria.mouseStrain?.value);
    this.survivalDays = new RangeCriteria(criteria.survivalDays?.value);
    this.tumorigenicity = new BoolCriteria(criteria.tumorigenicity?.value);
    this.tumorGrowthForm = new ValuesCriteria<string>(criteria.tumorGrowthForm?.value);
    this.intervention = new ValuesCriteria<string>(criteria.intervention?.value);
  }

  clone() {
    let criteria = new XenograftFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}