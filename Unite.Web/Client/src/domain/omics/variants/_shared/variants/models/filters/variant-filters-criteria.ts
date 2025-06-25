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

    this.id = new ValuesCriteria<number>(criteria.id?.value);
    this.chromosome = new ValuesCriteria<string>(criteria.chromosome?.value);
    this.position = new RangeCriteria(criteria.position?.value);
    this.length = new RangeCriteria(criteria.length?.value);
    this.gene = new ValuesCriteria<string>(criteria.gene?.value);
    this.impact = new ValuesCriteria<string>(criteria.impact?.value);
    this.effect = new ValuesCriteria<string>(criteria.effect?.value);
  }

  clone() {
    let criteria = new VariantFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}