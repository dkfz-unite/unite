import { sanitiseArray, sanitiseRange, sanitiseThreshold, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class ProjectFiltersCriteria {
    id = [];
    name = [];

    hasSsms = null;
    hasCnvs = null;
    hasSvs = null;
    hasExp = null;
    hasExpSc = null;

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length || 0;
        number += this.name?.length || 0;
        number += this.hasSsms != null ? 1 : 0;
        number += this.hasCnvs != null ? 1 : 0;
        number += this.hasSvs != null ? 1 : 0;
        number += this.hasExp != null ? 1 : 0;
        number += this.hasExpSc != null ? 1 : 0;

        return number;
    }

    constructor(criteria = null) {
        this.id = criteria?.id || [];
        this.name = criteria?.name || [];
        this.hasSsms = criteria?.hasSsms != null ? criteria.hasSsms : null;
        this.hasCnvs = criteria?.hasCnvs != null ? criteria.hasCnvs : null;
        this.hasSvs = criteria?.hasSvs != null ? criteria.hasSvs : null;
        this.hasExp = criteria?.hasExp != null ? criteria.hasExp : null;
        this.hasExpSc = criteria?.hasExpSc != null ? criteria.hasExpSc : null;
    }

    sanitise() {
        this.id = sanitiseArray(this.id, true);
        this.name = sanitiseArray(this.name);
    }

    clear() {
        this.id = [];
        this.name = [];

        this.hasSsms = null;
        this.hasCnvs = null;
        this.hasSvs = null;
        this.hasExp = null;
        this.hasExpSc = null;
    }

    clone() {
        let criteria = new ProjectFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}