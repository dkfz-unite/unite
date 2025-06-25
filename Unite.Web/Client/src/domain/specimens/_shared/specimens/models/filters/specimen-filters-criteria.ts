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

    this.id = new ValuesCriteria<number>(criteria.id?.value);
    this.referenceId = new ValuesCriteria<string>(criteria.referenceId?.value);
    this.mgmtStatus = new ValuesCriteria<string>(criteria.mgmtStatus?.value);
    this.idhStatus = new ValuesCriteria<string>(criteria.idhStatus?.value);
    this.idhMutation = new ValuesCriteria<string>(criteria.idhMutation?.value);
    this.geneExpressionSubtype = new ValuesCriteria<string>(criteria.geneExpressionSubtype?.value);
    this.methylationSubtype = new ValuesCriteria<string>(criteria.methylationSubtype?.value);
    this.gCimpMethylation = new BoolCriteria(criteria.gCimpMethylation?.value);
    this.drug = new ValuesCriteria<string>(criteria.drug?.value);
    this.dss = new RangeCriteria(criteria.dss?.value);
    this.dssSelective = new RangeCriteria(criteria.dssSelective?.value);
    this.hasSms = new BoolCriteria(criteria.hasSms?.value);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs?.value);
    this.hasSvs = new BoolCriteria(criteria.hasSvs?.value);
    this.hasMeth = new BoolCriteria(criteria.hasMeth?.value);
    this.hasExp = new BoolCriteria(criteria.hasExp?.value);
    this.hasExpSc = new BoolCriteria(criteria.hasExpSc?.value);
  }

  clone() {
    let criteria = new SpecimenFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}