import VariantFiltersCriteria from "../variant-filters-criteria";
import { copy } from "../../../../filter-criteria-helpers";

export default class CopyNumberVariantFiltersCriteria extends VariantFiltersCriteria {
    type = [];
    homoDel = null;
    loh = null;

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.type?.length || 0;
        number += this.homoDel != null ? 1 : 0;
        number += this.loh != null ? 1 : 0;
        
        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.type = criteria?.type || [];
        this.homoDel = criteria?.homoDel || null;
        this.loh = criteria?.loh || null;
    }

    sanitise() {
        super.sanitise();
    }

    clear() {
        super.clear();

        this.type = [];
        this.homoDel = null;
        this.loh = null;
    }

    clone() {
        var criteria = new CopyNumberVariantFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}