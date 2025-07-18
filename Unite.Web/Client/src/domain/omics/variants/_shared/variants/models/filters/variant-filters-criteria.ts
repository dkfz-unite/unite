import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";

export default class VariantFiltersCriteria extends FiltersCriteriaBase {
  id = new ValuesCriteria<number>();
  chromosome = new ValuesCriteria<string>();
  position = new RangeCriteria();
  length = new RangeCriteria();
  gene = new ValuesCriteria<string>();
  impact = new ValuesCriteria<string>();
  effect = new ValuesCriteria<string>();

  constructor(criteria: VariantFiltersCriteria | null = null) {
    super();

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id);
    this.chromosome = new ValuesCriteria<string>(criteria.chromosome);
    this.position = new RangeCriteria(criteria.position);
    this.length = new RangeCriteria(criteria.length);
    this.gene = new ValuesCriteria<string>(criteria.gene);
    this.impact = new ValuesCriteria<string>(criteria.impact);
    this.effect = new ValuesCriteria<string>(criteria.effect);
  }

  clone() {
    let criteria = new VariantFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}