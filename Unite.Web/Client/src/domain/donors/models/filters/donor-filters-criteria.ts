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

    this.id = new ValuesCriteria<number>(criteria.id?.value);
    this.referenceId = new ValuesCriteria<string>(criteria.referenceId?.value);

    this.sex = new ValuesCriteria<string>(criteria.sex?.value);
    this.age = new RangeCriteria(criteria.age?.value);
    this.diagnosis = new ValuesCriteria<string>(criteria.diagnosis?.value);
    this.primarySite = new ValuesCriteria<string>(criteria.primarySite?.value);
    this.localization = new ValuesCriteria<string>(criteria.localization?.value);
    this.vitalStatus = new BoolCriteria(criteria.vitalStatus?.value);
    this.vitalStatusChangeDay = new RangeCriteria(criteria.vitalStatusChangeDay?.value);
    this.progressionStatus = new BoolCriteria(criteria.progressionStatus?.value);
    this.progressionStatusChangeDay = new RangeCriteria(criteria.progressionStatusChangeDay?.value);
    this.therapy = new ValuesCriteria<string>(criteria.therapy?.value);

    this.mtaProtected = new BoolCriteria(criteria.mtaProtected?.value);
    this.project = new ValuesCriteria<string>(criteria.project?.value);
    this.study = new ValuesCriteria<string>(criteria.study?.value);

    this.hasSms = new BoolCriteria(criteria.hasSms?.value);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs?.value);
    this.hasSvs = new BoolCriteria(criteria.hasSvs?.value);
    this.hasMeth = new BoolCriteria(criteria.hasMeth?.value);
    this.hasExp = new BoolCriteria(criteria.hasExp?.value);
    this.hasExpSc = new BoolCriteria(criteria.hasExpSc?.value);
  }

  clone() {
    let criteria = new DonorFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}