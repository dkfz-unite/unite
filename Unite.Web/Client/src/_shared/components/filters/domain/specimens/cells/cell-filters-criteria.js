import SpecimenFiltersCriteria from "../specimen-filters-criteria";
import { sanitiseArray, copy } from "../../../filter-criteria-helpers";

export default class CellFiltersCriteria extends SpecimenFiltersCriteria {
    species = [];
    type = [];
    cultureType = [];
    name = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.species?.length || 0;
        number += this.type?.length || 0;
        number += this.cultureType?.length || 0;
        number += this.name?.length || 0;

        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.species = criteria?.species || [];
        this.type = criteria?.type || [];
        this.cultureType = criteria?.cultureType || [];
        this.name = criteria?.name || [];
    }

    sanitise(){
        super.sanitise();

        this.name = sanitiseArray(this.name);
    }

    clear() {
        super.clear();

        this.species = [];
        this.type = [];
        this.cultureType = [];
        this.name = [];
    }

    clone() {
        let criteria = new CellFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}