import SpecimenFilters from './filters.specimen.js';

class TissueFilters extends SpecimenFilters{
    type = [];
    tumourType = [];
    source = [];

    sanitise(){
        super.sanitise();

        this.source = this.sanitiseArray(this.source);
    }
}

export default TissueFilters;