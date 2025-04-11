import ImageFiltersCriteria from "../../../_shared/images/models/filters/image-filters-criteria";
import { sanitiseRange, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class MrFiltersCriteria extends ImageFiltersCriteria {
    wholeTumor = { from: null, to: null };
    contrastEnhancing = { from: null, to: null };
    nonContrastEnhancing = { from: null, to: null };

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.wholeTumor?.from != null ? 1 : 0;
        number += this.wholeTumor?.to != null ? 1 : 0;
        number += this.contrastEnhancing?.from != null ? 1 : 0;
        number += this.contrastEnhancing?.to != null ? 1 : 0;
        number += this.nonContrastEnhancing?.from != null ? 1 : 0;
        number += this.nonContrastEnhancing?.to != null ? 1 : 0;

        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.wholeTumor = criteria?.wholeTumor || { from: null, to: null };
        this.contrastEnhancing = criteria?.contrastEnhancing || { from: null, to: null };
        this.nonContrastEnhancing = criteria?.nonContrastEnhancing || { from: null, to: null };
    }

    sanitise(){
        super.sanitise();

        this.wholeTumor = sanitiseRange(this.wholeTumor);
        this.contrastEnhancing = sanitiseRange(this.contrastEnhancing);
        this.nonContrastEnhancing = sanitiseRange(this.nonContrastEnhancing);
    }

    clear() {
        super.clear();

        this.wholeTumor = { from: null, to: null };
        this.contrastEnhancing = { from: null, to: null };
        this.nonContrastEnhancing = { from: null, to: null };
    }

    clone() {
        let criteria = new MrFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}