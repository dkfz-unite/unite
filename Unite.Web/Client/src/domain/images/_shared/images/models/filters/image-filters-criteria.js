import { sanitiseArray, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class ImageFiltersCriteria {
    id = [];
    referenceId = [];

    hasSsms = null;
    hasCnvs = null;
    hasSvs = null;
    hasExp = null;
    hasExpSc = null;

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length || 0;
        number += this.referenceId?.length || 0;
        number += this.hasSsms != null ? 1 : 0;
        number += this.hasCnvs != null ? 1 : 0;
        number += this.hasSvs != null ? 1 : 0;
        number += this.hasExp != null ? 1 : 0;
        number += this.hasExpSc != null ? 1 : 0;

        return number;
    }

    constructor(criteria = null){
        this.id = criteria?.id || [];
        this.referenceId = criteria?.referenceId || [];
        this.hasSsms = criteria?.hasSsms != null ? criteria.hasSsms : null;
        this.hasCnvs = criteria?.hasCnvs != null ? criteria.hasCnvs : null;
        this.hasSvs = criteria?.hasSvs != null ? criteria.hasSvs : null;
        this.hasExp = criteria?.hasExp != null ? criteria.hasExp : null;
        this.hasExpSc = criteria?.hasExpSc != null ? criteria.hasExpSc : null;
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
        this.hasExp = null;
        this.hasExpSc = null;
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