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

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id?.value);
    this.symbol = new ValuesCriteria<string>(criteria.symbol?.value);
    this.biotype = new ValuesCriteria<string>(criteria.biotype?.value);
    this.chromosome = new ValuesCriteria<string>(criteria.chromosome?.value);
    this.position = new RangeCriteria(criteria.position?.value);
    this.hasSms = new BoolCriteria(criteria.hasSms?.value);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs?.value);
    this.hasSvs = new BoolCriteria(criteria.hasSvs?.value);
    this.hasExp = new BoolCriteria(criteria.hasExp?.value);
  }

  clone() {
    let criteria = new GeneFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}