import SpecimenFilters from './filters.specimen.js';

class OrganoidFilters extends SpecimenFilters {
    medium = [];
    tumorigenicity = null;

    intervention = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.medium?.length ? this.medium.length : 0;
        number += this.tumorigenicity != null && this.tumorigenicity != undefined ? 1 : 0;
        number += this.intervention?.length ? this.intervention.length : 0;

        return number;
    }

    sanitise() {
        super.sanitise();

        this.medium = this.sanitiseArray(this.medium);
        this.intervention = this.sanitiseArray(this.intervention);
    }

    clear() {
        super.clear();
        
        this.medium = [];
        this.tumorigenicity = null;

        this.intervention = [];
    }

    clone() {
        var criteria = new OrganoidFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default OrganoidFilters;