import SpecimenFilters from './filters.specimen.js';

class OrganoidFilters extends SpecimenFilters {
    medium = [];
    tumorigenicity = null;

    intervention = [];

    sanitise() {
        super.sanitise();

        this.medium = this.sanitiseArray(this.medium);
        this.intervention = this.sanitiseArray(this.intervention);
    }
}

export default OrganoidFilters;