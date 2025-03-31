import { sanitiseArray, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class ImageFiltersCriteria {
    id = [];
    referenceId = [];

    hasSsms = null;
    hasCnvs = null;
    hasSvs = null;
    hasGeneExp = null;
    hasGeneExpSc = null;
    hasMeth = null;

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length || 0;
        number += this.referenceId?.length || 0;
        number += this.hasSsms != null ? 1 : 0;
        number += this.hasCnvs != null ? 1 : 0;
        number += this.hasSvs != null ? 1 : 0;
        number += this.hasGeneExp != null ? 1 : 0;
        number += this.hasGeneExpSc != null ? 1 : 0;
        number += this.hasMeth != null ? 1 : 0;

        return number;
    }

    constructor(criteria = null){
        this.id = criteria?.id || [];
        this.referenceId = criteria?.referenceId || [];
        this.hasSsms = criteria?.hasSsms != null ? criteria.hasSsms : null;
        this.hasCnvs = criteria?.hasCnvs != null ? criteria.hasCnvs : null;
        this.hasSvs = criteria?.hasSvs != null ? criteria.hasSvs : null;
        this.hasGeneExp = criteria?.hasGeneExp != null ? criteria.hasGeneExp : null;
        this.hasGeneExpSc = criteria?.hasGeneExpSc != null ? criteria.hasGeneExpSc : null;
        this.hasMeth = criteria?.hasMeth != null ? criteria.hasMeth : null;
    }

    sanitise(){
        this.id = sanitiseArray(this.id, true);
        this.referenceId = sanitiseArray(this.referenceId);
    }

    clear() {
        this.id = [];
        this.referenceId = [];
        this.hasSsms = null;
        this.hasCnvs = null;
        this.hasSvs = null;
        this.hasGeneExp = null;
        this.hasGeneExpSc = null;
        this.hasMeth = null;
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