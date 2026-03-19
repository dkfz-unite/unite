import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import BoolCriteria from "@/_shared/components/filters/models/criteria-bool";
import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";

export default class ProteinFiltersCriteria extends FiltersCriteriaBase {
  id = new ValuesCriteria<number>();
  accession = new ValuesCriteria<string>();
  symbol = new ValuesCriteria<string>();
  chromosome = new ValuesCriteria<string>();
  position = new RangeCriteria();
  expression = new RangeCriteria();

  constructor(criteria: ProteinFiltersCriteria | null = null) {
    super();

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id);
    this.accession = new ValuesCriteria<string>(criteria.accession);
    this.symbol = new ValuesCriteria<string>(criteria.symbol);
    this.chromosome = new ValuesCriteria<string>(criteria.chromosome);
    this.position = new RangeCriteria(criteria.position);
    this.expression = new RangeCriteria(criteria.expression);
  }

  clone() : ProteinFiltersCriteria {
    return new ProteinFiltersCriteria(this);
  }
}