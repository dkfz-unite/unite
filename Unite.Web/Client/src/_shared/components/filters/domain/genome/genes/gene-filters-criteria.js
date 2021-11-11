import { sanitiseArray, sanitiseRange, copy } from "../../../filter-criteria-helpers";

export default class GeneFiltersCriteria {
    id = [];
    symbol = [];
    biotype = [];
    chromosome = [];
    position = { from: null, to: null };

    get numberOfFilters() {
        let number = 0;

        number += this.id?.length || 0;
        number += this.symbol?.length || 0;
        number += this.biotype?.length || 0;
        number += this.chromosome?.length || 0;
        number += this.position?.from != null ? 1 : 0;
        number += this.position?.to != null ? 1 : 0;

        return number;
    }

    constructor(criteria = null) {
        this.id = criteria?.id || [];
        this.symbol = criteria?.symbol || [];
        this.biotype = criteria?.biotype || [];
        this.chromosome = criteria?.chromosome || [];
        this.position = criteria?.position || { from: null, to: null };
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