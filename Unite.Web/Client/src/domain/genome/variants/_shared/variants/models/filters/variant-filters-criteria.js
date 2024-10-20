import { sanitiseArray, sanitiseRange, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class VariantFiltersCriteria {
    id = [];
    chromosome = [];
    position = { from: null, to: null };
    length = { from: null, to: null };
    gene = [];
    impact = [];
    effect = [];

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length || 0;
        number += this.chromosome?.length || 0;
        number += this.position?.from != null ? 1 : 0;
        number += this.position?.to != null ? 1 : 0;
        number += this.length?.from != null ? 1 : 0;
        number += this.gene?.length || 0;
        number += this.impact?.length || 0;
        number += this.effect?.length || 0;
        
        return number;
    }

    constructor(criteria = null) {
        this.id = criteria?.id || [];
        this.chromosome = criteria?.chromosome || [];
        this.position = criteria?.position || { from: null, to: null };
        this.position = criteria?.length || { from: null, to: null };
        this.gene = criteria?.gene || [];
        this.impact = criteria?.impact || [];
        this.effect = criteria?.effect || [];
    }

    sanitise() {
        this.id = sanitiseArray(this.id);
        this.position = sanitiseRange(this.position);
    }

    clear() {
        this.id = [];
        this.chromosome = [];
        this.position = { from: null, to: null };
        this.length = { from: null, to: null };
        this.gene = [];
        this.impact = [];
        this.effect = [];
    }

    clone() {
        var criteria = new VariantFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}