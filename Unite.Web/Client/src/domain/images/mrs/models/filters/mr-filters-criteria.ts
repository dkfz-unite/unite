import RangeCriteria from "@/_shared/components/filters/models/criteria-range";
import ImageFiltersCriteria from "../../../_shared/images/models/filters/image-filters-criteria";

export default class MrFiltersCriteria extends ImageFiltersCriteria {
  wholeTumor = new RangeCriteria();
  contrastEnhancing = new RangeCriteria();
  nonContrastEnhancing = new RangeCriteria();

  constructor(criteria: MrFiltersCriteria | null = null) {
    super(criteria);

    if (!criteria)
      return;

    this.wholeTumor = new RangeCriteria(criteria.wholeTumor);
    this.contrastEnhancing = new RangeCriteria(criteria.contrastEnhancing);
    this.nonContrastEnhancing = new RangeCriteria(criteria.nonContrastEnhancing);
  }

  // clone() {
  //   let criteria = new MrFiltersCriteria();
  //   Object.assign(criteria, this);

  //   return criteria;
  // }

  clone() : MrFiltersCriteria {
    return new MrFiltersCriteria(this);
  }
}