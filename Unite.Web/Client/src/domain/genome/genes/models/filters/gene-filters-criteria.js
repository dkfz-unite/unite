import { sanitiseArray, sanitiseRange, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class GeneFiltersCriteria {
    id = [];
    symbol = [];
    biotype = [];
    chromosome = [];
    position = { from: null, to: null };
    hasSsms = null;
    hasCnvs = null;
    hasSvs = null;
    hasExp = null;

    get numberOfFilters() {
        let number = 0;

        number += this.id?.length || 0;
        number += this.symbol?.length || 0;
        number += this.biotype?.length || 0;
        number += this.chromosome?.length || 0;
        number += this.position?.from != null ? 1 : 0;
        number += this.position?.to != null ? 1 : 0;
        number += this.hasSsms != null ? 1 : 0;
        number += this.hasCnvs != null ? 1 : 0;
        number += this.hasSvs != null ? 1 : 0;
        number += this.hasExp != null ? 1 : 0;

        return number;
    }

    constructor(criteria = null) {
        this.id = criteria?.id || [];
        this.symbol = criteria?.symbol || [];
        this.biotype = criteria?.biotype || [];
        this.chromosome = criteria?.chromosome || [];
        this.position = criteria?.position || { from: null, to: null };
        this.hasSsms = criteria?.hasSsms != null ? criteria.hasSsms : null;
        this.hasCnvs = criteria?.hasCnvs != null ? criteria.hasCnvs : null;
        this.hasSvs = criteria?.hasSvs != null ? criteria.hasSvs : null;
        this.hasExp = criteria?.hasExp != null ? criteria.hasExp : null;
    }

    sanitise(){
        this.id = sanitiseArray(this.id, true);
        this.symbol = sanitiseArray(this.symbol);
        this.position = sanitiseRange(this.position);
    };

    clear() {
        this.id = [];

        this.symbol = [];
        this.biotype = [];
        this.chromosome = [];
        this.position = { from: null, to: null };
        this.hasSsms = null;
        this.hasCnvs = null;
        this.hasSvs = null;
        this.hasExp = null;
    };

    clone() {
        let criteria = new GeneFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    };

    copy() {
        return copy(this);
    };
}