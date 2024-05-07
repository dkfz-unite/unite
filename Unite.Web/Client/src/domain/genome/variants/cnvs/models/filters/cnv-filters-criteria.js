import VariantFiltersCriteria from "../../../_shared/variants/models/filters/variant-filters-criteria";
import { copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class CopyNumberVariantFiltersCriteria extends VariantFiltersCriteria {
    type = [];
    del = null;
    loh = null;

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.type?.length || 0;
        number += this.del != null ? 1 : 0;
        number += this.loh != null ? 1 : 0;
        
        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.type = criteria?.type || [];
        this.del = criteria?.del != null ? criteria.del : null;
        this.loh = criteria?.loh != null ? criteria.loh : null;
    }

    sanitise() {
        super.sanitise();
    }

    clear() {
        super.clear();

        this.type = [];
        this.del = null;
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