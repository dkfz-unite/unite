import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";

export default class DonorFiltersCriteria extends FiltersCriteriaBase {
  id = new ValuesCriteria<number>();
  referenceId = new ValuesCriteria<string>();

  sex = new ValuesCriteria<string>();
  age = new RangeCriteria();
  diagnosis = new ValuesCriteria<string>();
  primarySite = new ValuesCriteria<string>();
  localization = new ValuesCriteria<string>();
  vitalStatus = new BoolCriteria();
  vitalStatusChangeDay = new RangeCriteria();
  progressionStatus = new BoolCriteria();
  progressionStatusChangeDay = new RangeCriteria();
  therapy = new ValuesCriteria<string>();

  mtaProtected = new BoolCriteria();
  project = new ValuesCriteria<string>();
  study = new ValuesCriteria<string>();

  hasSms = new BoolCriteria();
  hasCnvs = new BoolCriteria();
  hasSvs = new BoolCriteria();
  hasMeth = new BoolCriteria();
  hasExp = new BoolCriteria();
  hasExpSc = new BoolCriteria();

  constructor(criteria: DonorFiltersCriteria | null = null) {
    super();
  }

  clone() {
    let criteria = new DonorFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}