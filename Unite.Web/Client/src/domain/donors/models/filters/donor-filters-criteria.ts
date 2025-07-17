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
    super(criteria);

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id);
    this.referenceId = new ValuesCriteria<string>(criteria.referenceId);

    this.sex = new ValuesCriteria<string>(criteria.sex);
    this.age = new RangeCriteria(criteria.age);
    this.diagnosis = new ValuesCriteria<string>(criteria.diagnosis);
    this.primarySite = new ValuesCriteria<string>(criteria.primarySite);
    this.localization = new ValuesCriteria<string>(criteria.localization);
    this.vitalStatus = new BoolCriteria(criteria.vitalStatus);
    this.vitalStatusChangeDay = new RangeCriteria(criteria.vitalStatusChangeDay);
    this.progressionStatus = new BoolCriteria(criteria.progressionStatus);
    this.progressionStatusChangeDay = new RangeCriteria(criteria.progressionStatusChangeDay);
    this.therapy = new ValuesCriteria<string>(criteria.therapy);

    this.mtaProtected = new BoolCriteria(criteria.mtaProtected);
    this.project = new ValuesCriteria<string>(criteria.project);
    this.study = new ValuesCriteria<string>(criteria.study);

    this.hasSms = new BoolCriteria(criteria.hasSms);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs);
    this.hasSvs = new BoolCriteria(criteria.hasSvs);
    this.hasMeth = new BoolCriteria(criteria.hasMeth);
    this.hasExp = new BoolCriteria(criteria.hasExp);
    this.hasExpSc = new BoolCriteria(criteria.hasExpSc);
  }

  clone() {
    let criteria = new DonorFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}