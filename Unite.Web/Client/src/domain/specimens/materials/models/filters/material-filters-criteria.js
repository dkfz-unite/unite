import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import { sanitiseArray, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class MaterialFiltersCriteria extends SpecimenFiltersCriteria {
    type = [];
    fixationType = [];
    tumorType = [];
    tumorGrade = { from: null, to: null };
    source = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.type?.length || 0;
        number += this.fixationType?.length || 0;
        number += this.tumorType?.length || 0;
        number += this.tumorGrade?.from != null ? 1 : 0;
        number += this.tumorGrade?.to != null ? 1 : 0;
        number += this.source?.length || 0;

        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.type = criteria?.type || [];
        this.fixationType = criteria?.fixationType || [];
        this.tumorType = criteria?.tumorType || [];
        this.tumorGrade = criteria?.tumorGrade || { from: null, to: null };
        this.source = criteria?.source || [];
    }

    sanitise(){
        super.sanitise();

        this.source = sanitiseArray(this.source);
    }

    clear() {
        super.clear();

        this.type = [];
        this.fixationType = [];
        this.tumorType = [];
        this.tumorGrade = { from: null, to: null };
        this.source = [];
    }

    clone() {
        let criteria = new MaterialFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}