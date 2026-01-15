import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";

export default class SpecimenFiltersCriteria extends FiltersCriteriaBase {
  id = new ValuesCriteria<number>();
  referenceId = new ValuesCriteria<string>();
  condition = new ValuesCriteria<string>();
  tumorType = new ValuesCriteria<string>();
  tumorGrade = new RangeCriteria();
  tumorSuperfamily = new ValuesCriteria<string>();
  tumorFamily = new ValuesCriteria<string>();
  tumorClass = new ValuesCriteria<string>();
  tumorSubclass = new ValuesCriteria<string>();
  mgmtStatus = new BoolCriteria();
  idhStatus = new BoolCriteria();
  idhMutation = new ValuesCriteria<string>();
  tertStatus = new BoolCriteria();
  tertMutation = new ValuesCriteria<string>();
  expressionSubtype = new ValuesCriteria<string>();
  methylationSubtype = new ValuesCriteria<string>();
  gCimpMethylation = new BoolCriteria();
  geneKnockout = new ValuesCriteria<string>();
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
    this.condition = new ValuesCriteria<string>(criteria.condition);
    this.tumorType = new ValuesCriteria<string>(criteria.tumorType);
    this.tumorGrade = new RangeCriteria(criteria.tumorGrade);
    this.tumorSuperfamily = new ValuesCriteria<string>(criteria.tumorSuperfamily);
    this.tumorFamily = new ValuesCriteria<string>(criteria.tumorFamily);
    this.tumorClass = new ValuesCriteria<string>(criteria.tumorClass);
    this.tumorSubclass = new ValuesCriteria<string>(criteria.tumorSubclass);
    this.mgmtStatus = new BoolCriteria(criteria.mgmtStatus);
    this.idhStatus = new BoolCriteria(criteria.idhStatus);
    this.idhMutation = new ValuesCriteria<string>(criteria.idhMutation);
    this.tertStatus = new BoolCriteria(criteria.tertStatus);
    this.tertMutation = new ValuesCriteria<string>(criteria.tertMutation);
    this.expressionSubtype = new ValuesCriteria<string>(criteria.expressionSubtype);
    this.methylationSubtype = new ValuesCriteria<string>(criteria.methylationSubtype);
    this.gCimpMethylation = new BoolCriteria(criteria.gCimpMethylation);
    this.geneKnockout = new ValuesCriteria<string>(criteria.geneKnockout);
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