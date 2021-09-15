import SpecimenFilters from './filters.specimen.js';

class TissueFilters extends SpecimenFilters{
    type = [];
    tumorType = [];
    source = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.type?.length ? this.type.length : 0;
        number += this.tumorType?.length ? this.tumorType.length : 0;
        number += this.source?.length ? this.source.length : 0;

        return number;
    }

    sanitise(){
        super.sanitise();

        this.source = this.sanitiseArray(this.source);
    }

    clear() {
        super.clear();

        this.type = [];
        this.tumorType = [];
        this.source = [];
    }

    clone() {
        var criteria = new TissueFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default TissueFilters;