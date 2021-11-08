export const MAX_DONORS = 3000;
export const MAX_GENES = 100;

const DEFAULT_DONORS = 200;
const DEFAULT_GENES = 50;

export default class OncogridFiltersCriteria {
    numberOfDonors = DEFAULT_DONORS;
    numberOfGenes = DEFAULT_GENES;

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