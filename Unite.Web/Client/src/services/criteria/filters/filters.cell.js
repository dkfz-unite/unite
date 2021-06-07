import SpecimenFilters from './filters.specimen.js';

class CellLineFilters extends SpecimenFilters{
    type = [];
    species = [];
    name = [];

    sanitise(){
        super.sanitise();

        this.name = this.sanitiseArray(this.name);
    }
}

export default CellLineFilters;