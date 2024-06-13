import { sanitiseArray, sanitiseRange, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class FeatureFiltersCriteria {
    gene = [];
    group = false;
    chromosome = [];
    position = { from: null, to: null };
    impact = [];
    effect = [];

    get numberOfFilters() {
        let number = 0;
        
        number += this.gene?.length || 0;
        number += this.group ? 1 : 0;
        number += this.chromosome?.length || 0;
        number += this.position?.from != null ? 1 : 0;
        number += this.position?.to != null ? 1 : 0;
        number += this.impact?.length || 0;
        number += this.effect?.length || 0;
        
        return number;
    }

    constructor(criteria = null) {
        this.gene = criteria?.gene || [];
        this.group = criteria?.group != null ? criteria.group : false;
        this.chromosome = criteria?.chromosome || [];
        this.position = criteria?.position || { from: null, to: null };
        this.impact = criteria?.impact || [];
        this.effect = criteria?.effect || [];
    }

    sanitise() {
        this.gene = sanitiseArray(this.id);
        this.position = sanitiseRange(this.position);
    }

    clear() {
        this.gene = [];
        this.group = false;
        this.chromosome = [];
        this.position = { from: null, to: null };
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