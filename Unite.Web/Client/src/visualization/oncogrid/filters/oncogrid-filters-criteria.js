export const MAX_DONORS = 50;
export const MAX_GENES = 100;
export const DEFAULT_DONORS = 30;
export const DEFAULT_GENES = 50;

export default class OncogridFiltersCriteria {
  numberOfDonors = DEFAULT_DONORS;
  numberOfGenes = DEFAULT_GENES;

  get numberOfFilters() {
    let number = 0;

    number += this.numberOfDonors !== DEFAULT_DONORS ? 1 : 0;
    number += this.numberOfGenes !== DEFAULT_GENES ? 1 : 0;

    return number;
  }

  sanitise() {
    if (this.numberOfDonors == null || this.numberOfDonors <= 0) {
      this.numberOfDonors = DEFAULT_DONORS;
    } else if (this.numberOfDonors > MAX_DONORS) {
      this.numberOfDonors = MAX_DONORS;
    }

    if (this.numberOfGenes == null || this.numberOfGenes <= 0) {
      this.numberOfGenes = DEFAULT_GENES;
    } else if (this.numberOfGenes > MAX_GENES) {
      this.numberOfGenes = MAX_GENES;
    }
  }

  clear() {
    this.numberOfDonors = DEFAULT_DONORS;
    this.numberOfGenes = DEFAULT_GENES;
  }

  clone() {
    let criteria = new OncogridFiltersCriteria();
    Object.assign(criteria, this);

    return criteria;
  }
}