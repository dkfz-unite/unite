import VariantFiltersCriteria from "../variant-filters-criteria";
import { copy } from "../../../../filter-criteria-helpers";

export default class MutationFiltersCriteria extends VariantFiltersCriteria {
    type = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.type?.length || 0;
        
        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.type = criteria?.type || [];
    }

    sanitise() {
        super.sanitise();
    }

    clear() {
        super.clear();

        this.type = [];
    }

    clone() {
        var criteria = new MutationFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}