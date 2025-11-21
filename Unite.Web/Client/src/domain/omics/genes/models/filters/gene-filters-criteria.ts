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

    this.id = new ValuesCriteria<number>(criteria.id);
    this.symbol = new ValuesCriteria<string>(criteria.symbol);
    this.biotype = new ValuesCriteria<string>(criteria.biotype);
    this.chromosome = new ValuesCriteria<string>(criteria.chromosome);
    this.position = new RangeCriteria(criteria.position);
    this.hasSms = new BoolCriteria(criteria.hasSms);
    this.hasCnvs = new BoolCriteria(criteria.hasCnvs);
    this.hasSvs = new BoolCriteria(criteria.hasSvs);
    this.hasExp = new BoolCriteria(criteria.hasExp);
  }

  // clone() {
  //   let criteria = new GeneFiltersCriteria();
  //   Object.assign(criteria, this);

  //   return criteria;
  // }

  clone() : GeneFiltersCriteria {
    return new GeneFiltersCriteria(this);
  }
}