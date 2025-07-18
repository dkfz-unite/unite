import FiltersCriteriaBase from "@/_shared/components/filters/filters-criteria-base";
import NumberCriteria from "@/_shared/components/filters/models/criteria-number";

export const MAX_DONORS = 50;
export const MAX_GENES = 100;
export const DEFAULT_DONORS = 30;
export const DEFAULT_GENES = 50;

export default class OncogridFiltersCriteria extends FiltersCriteriaBase {
  numberOfDonors = new NumberCriteria(null, DEFAULT_DONORS);
  numberOfGenes = new NumberCriteria(null, DEFAULT_GENES);

  public get numberOfFilters() {
    let number = 0;

    number += this.numberOfDonors.value !== DEFAULT_DONORS ? 1 : 0;
    number += this.numberOfGenes.value !== DEFAULT_GENES ? 1 : 0;

    return number;
  }

  public constructor(criteria: OncogridFiltersCriteria | null = null) {
    super(criteria);
    if (!criteria)
      return;

    this.numberOfDonors = new NumberCriteria(criteria.numberOfDonors);
    this.numberOfGenes = new NumberCriteria(criteria.numberOfGenes);
  }

  public sanitise() : void {
    if (this.numberOfDonors.value == null || this.numberOfDonors.value <= 0) {
      this.numberOfDonors.value = DEFAULT_DONORS;
    } else if (this.numberOfDonors.value > MAX_DONORS) {
      this.numberOfDonors.value = MAX_DONORS;
    }

    if (this.numberOfGenes.value == null || this.numberOfGenes.value <= 0) {
      this.numberOfGenes.value = DEFAULT_GENES;
    } else if (this.numberOfGenes.value > MAX_GENES) {
      this.numberOfGenes.value = MAX_GENES;
    }
  }

  clone() {
    let criteria = new OncogridFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}