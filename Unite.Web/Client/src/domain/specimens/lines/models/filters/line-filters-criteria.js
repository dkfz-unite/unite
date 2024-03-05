import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import { sanitiseArray, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class LineFiltersCriteria extends SpecimenFiltersCriteria {
    cellsSpecies = [];
    cellsType = [];
    cellsCultureType = [];
    intervention = [];
    name = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.cellsSpecies?.length || 0;
        number += this.cellsType?.length || 0;
        number += this.cellsCultureType?.length || 0;
        number += this.intervention?.length || 0;
        number += this.name?.length || 0;

        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.cellsSpecies = criteria?.cellsSpecies || [];
        this.cellsType = criteria?.cellsType || [];
        this.cellsCultureType = criteria?.cellsCultureType || [];
        this.intervention = criteria?.intervention || [];
        this.name = criteria?.name || [];
    }

    sanitise(){
        super.sanitise();

        this.name = sanitiseArray(this.name);
        this.intervention = sanitiseArray(this.intervention);
    }

    clear() {
        super.clear();

        this.cellsSpecies = [];
        this.cellsType = [];
        this.cellsCultureType = [];
        this.intervention = [];
        this.name = [];
    }

    clone() {
        let criteria = new LineFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}