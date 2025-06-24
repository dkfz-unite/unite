import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";

export default class GeneFiltersCriteria extends FiltersCriteriaBase {
  id = new ValuesCriteria<number>();
  symbol = new ValuesCriteria<string>();
  biotype = new ValuesCriteria<string>();
  chromosome = new ValuesCriteria<string>();
  position = new RangeCriteria();
  hasSms = new BoolCriteria();
  hasCnvs = new BoolCriteria();
  hasSvs = new BoolCriteria();
  hasExp = new BoolCriteria();

  constructor(criteria: GeneFiltersCriteria | null = null) {
    super();
  }
  clone() {
    let criteria = new GeneFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}