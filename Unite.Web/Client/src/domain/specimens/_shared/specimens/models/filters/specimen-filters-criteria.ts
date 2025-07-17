import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";

export default class SpecimenFiltersCriteria extends FiltersCriteriaBase {
  id = new ValuesCriteria<number>();
  referenceId = new ValuesCriteria<string>();
  mgmtStatus = new ValuesCriteria<string>();
  idhStatus = new ValuesCriteria<string>();
  idhMutation = new ValuesCriteria<string>();
  geneExpressionSubtype = new ValuesCriteria<string>();
  methylationSubtype = new ValuesCriteria<string>();
  gCimpMethylation = new BoolCriteria();
  drug = new ValuesCriteria<string>();
  dss = new RangeCriteria();
  dssSelective = new RangeCriteria();

  hasSms = new BoolCriteria();
  hasCnvs = new BoolCriteria();
  hasSvs = new BoolCriteria();
  hasMeth = new BoolCriteria();
  hasExp = new BoolCriteria();
  hasExpSc = new BoolCriteria();

  constructor(criteria: SpecimenFiltersCriteria | null = null) {
    super();

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id);
    this.referenceId = new ValuesCriteria<string>(criteria.referenceId);
    this.mgmtStatus = new ValuesCriteria<string>(criteria.mgmtStatus);
    this.idhStatus = new ValuesCriteria<string>(criteria.idhStatus);
    this.idhMutation = new ValuesCriteria<string>(criteria.idhMutation);
    this.geneExpressionSubtype = new ValuesCriteria<string>(criteria.geneExpressionSubtype);
    this.methylationSubtype = new ValuesCriteria<string>(criteria.methylationSubtype);
    this.gCimpMethylation = new BoolCriteria(criteria.gCimpMethylation);
    this.drug = new ValuesCriteria<string>(criteria.drug);
    this.dss = new RangeCriteria(criteria.dss);
    this.dssSelective = new RangeCriteria(criteria.dssSelective);
    this.hasSms = new BoolCriteria(criteria.hasSms);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs);
    this.hasSvs = new BoolCriteria(criteria.hasSvs);
    this.hasMeth = new BoolCriteria(criteria.hasMeth);
    this.hasExp = new BoolCriteria(criteria.hasExp);
    this.hasExpSc = new BoolCriteria(criteria.hasExpSc);
  }

  clone() {
    let criteria = new SpecimenFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}