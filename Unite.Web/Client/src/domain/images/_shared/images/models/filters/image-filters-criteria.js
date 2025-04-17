import { sanitiseArray, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class ImageFiltersCriteria {
    id = [];
    referenceId = [];

    hasSms = null;
    hasCnvs = null;
    hasSvs = null;
    hasMeth = null;
    hasGeneExp = null;
    hasGeneExpSc = null;

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length || 0;
        number += this.referenceId?.length || 0;
        number += this.hasSms != null ? 1 : 0;
        number += this.hasCnvs != null ? 1 : 0;
        number += this.hasSvs != null ? 1 : 0;
        number += this.hasMeth != null ? 1 : 0;
        number += this.hasGeneExp != null ? 1 : 0;
        number += this.hasGeneExpSc != null ? 1 : 0;


        return number;
    }

    constructor(criteria = null){
        this.id = criteria?.id || [];
        this.referenceId = criteria?.referenceId || [];
        this.hasSms = criteria?.hasSms != null ? criteria.hasSms : null;
        this.hasCnvs = criteria?.hasCnvs != null ? criteria.hasCnvs : null;
        this.hasSvs = criteria?.hasSvs != null ? criteria.hasSvs : null;
        this.hasMeth = criteria?.hasMeth != null ? criteria.hasMeth : null;
        this.hasGeneExp = criteria?.hasGeneExp != null ? criteria.hasGeneExp : null;
        this.hasGeneExpSc = criteria?.hasGeneExpSc != null ? criteria.hasGeneExpSc : null;
    }

    sanitise(){
        this.id = sanitiseArray(this.id, true);
        this.referenceId = sanitiseArray(this.referenceId);
    }

    clear() {
        this.id = [];
        this.referenceId = [];
        this.hasSms = null;
        this.hasCnvs = null;
        this.hasSvs = null;
        this.hasMeth = null;
        this.hasGeneExp = null;
        this.hasGeneExpSc = null;
    }

    clone() {
        let criteria = new ImageFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}