import Filters from './filters.js';

export const MAX_DONORS = 3000;
export const MAX_GENES = 100;

class OncoGridFilters extends Filters {
    #numberOfDonors = 200;
    #numberOfGenes = 50;

    numberOfDonors = this.#numberOfDonors;
    numberOfGenes = this.#numberOfGenes;

    sanitise() {
        if (!this.numberOfDonors || this.numberOfDonors <= 0) {
            this.numberOfDonors = this.#numberOfDonors;
        } else if (this.numberOfDonors > MAX_DONORS) {
            this.numberOfDonors = MAX_DONORS;
        }

        if (!this.numberOfGenes || this.numberOfGenes <= 0) {
            this.numberOfGenes = this.#numberOfGenes;
        } else if (this.numberOfGenes > MAX_GENES) {
            this.numberOfGenes = MAX_GENES;
        }
    }

    clear() {
        this.numberOfDonors = this.#numberOfDonors;
        this.numberOfGenes = this.#numberOfGenes;
    }

    clone() {
        var criteria = new OncoGridFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default OncoGridFilters;