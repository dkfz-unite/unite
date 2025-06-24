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
  }

  clone() {
    let criteria = new SpecimenFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}