import ValuesCriteria from "@/_shared/components/filters/models/criteria-values";
import DataFiltersCriteria from "@/domain/_shared/entries/models/filters/data-filters-criteria";

export default class ImageFiltersCriteria extends DataFiltersCriteria {
  id = new ValuesCriteria<number>();
  referenceId = new ValuesCriteria<string>();

  constructor(criteria: ImageFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.id = new ValuesCriteria<number>(criteria.id);
    this.referenceId = new ValuesCriteria<string>(criteria.referenceId);
  }

  clone() : ImageFiltersCriteria {
    return new ImageFiltersCriteria(this);
    // Object.assign(criteria, this);

    // return criteria;
  }
}