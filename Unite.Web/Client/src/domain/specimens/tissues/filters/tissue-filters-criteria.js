import SpecimenFiltersCriteria from "../../_shared/filters/specimen-filters-criteria";
import { sanitiseArray, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class TissueFiltersCriteria extends SpecimenFiltersCriteria {
    type = [];
    tumorType = [];
    source = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.type?.length || 0;
        number += this.tumorType?.length || 0;
        number += this.source?.length || 0;

        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.type = criteria?.type || [];
        this.tumorType = criteria?.tumorType || [];
        this.source = criteria?.source || [];
    }

    sanitise(){
        super.sanitise();

        this.source = sanitiseArray(this.source);
    }

    clear() {
        super.clear();

        this.type = [];
        this.tumorType = [];
        this.source = [];
    }

    clone() {
        let criteria = new TissueFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}