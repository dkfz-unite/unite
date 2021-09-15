import SpecimenFilters from './filters.specimen.js';

class CellLineFilters extends SpecimenFilters{
    species = [];
    type = [];
    cultureType = [];
    name = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.species?.length ? this.species.length : 0;
        number += this.type?.length ? this.type.length : 0;
        number += this.cultureType?.length ? this.cultureType.length : 0;
        number += this.name?.length ? this.name.length : 0;

        return number;
    }

    sanitise(){
        super.sanitise();

        this.name = this.sanitiseArray(this.name);
    }

    clear() {
        super.clear();

        this.species = [];
        this.type = [];
        this.cultureType = [];
        this.name = [];
    }

    clone() {
        var criteria = new CellLineFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default CellLineFilters;