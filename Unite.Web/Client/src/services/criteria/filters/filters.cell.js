import SpecimenFilters from './filters.specimen.js';

class CellLineFilters extends SpecimenFilters{
    name = [];
    type = [];
    species = [];

    sanitise(){
        super.sanitise();

        this.name = this.sanitiseArray(this.name);
    }
}

export default CellLineFilters;