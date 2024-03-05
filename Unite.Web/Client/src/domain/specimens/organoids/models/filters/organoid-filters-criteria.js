import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import { sanitiseArray, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class OrganoidFiltersCriteria extends SpecimenFiltersCriteria {
    medium = [];
    tumorigenicity = null;
    intervention = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.medium?.length || 0;
        number += this.tumorigenicity != null ? 1 : 0;
        number += this.intervention?.length || 0;

        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.medium = criteria?.medium || [];
        this.tumorigenicity = criteria?.tumorigenicity || null;
        this.intervention = criteria?.intervention || [];
    }

    sanitise() {
        super.sanitise();

        this.medium = sanitiseArray(this.medium);
        this.intervention = sanitiseArray(this.intervention);
    }

    clear() {
        super.clear();
        
        this.medium = [];
        this.tumorigenicity = null;
        this.intervention = [];
    }

    clone() {
        let criteria = new OrganoidFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}