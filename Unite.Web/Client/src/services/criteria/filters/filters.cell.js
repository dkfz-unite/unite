import SpecimenFilters from './filters.specimen.js';

class CellLineFilters extends SpecimenFilters{
    species = [];
    type = [];
    cultureType = [];
    name = [];

    sanitise(){
        super.sanitise();

        this.name = this.sanitiseArray(this.name);
    }
}

export default CellLineFilters;