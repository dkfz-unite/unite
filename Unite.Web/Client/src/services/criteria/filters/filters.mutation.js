import Filters from './filters.js';

class MutationFilters extends Filters{
    id = [];

    code = [];
    sequenceType = [];
    mutationType = [];
    chromosome = [];
    position = { from: null, to: null };
    impact = [];
    consequence = [];

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length ? this.id.length : 0;

        number += this.code?.length ? this.code.length : 0;
        number += this.sequenceType?.length ? this.sequenceType.length : 0;
        number += this.mutationType?.length ? this.mutationType.length : 0;
        number += this.chromosome?.length ? this.chromosome.length : 0;
        number += this.position?.from != null && this.position?.from != undefined ? 1 : 0;
        number += this.position?.to != null && this.position?.to != undefined ? 1 : 0;
        number += this.impact?.length ? this.impact.length : 0;
        number += this.consequence?.length ? this.consequence.length : 0;
        
        return number;
    }

    sanitise(){
        this.code = this.sanitiseArray(this.code);
        this.position = this.sanitiseRange(this.position);
    }

    clear() {
        this.id = [];

        this.code = [];
        this.sequenceType = [];
        this.mutationType = [];
        this.chromosome = [];
        this.position = { from: null, to: null };
        this.impact = [];
        this.consequence = [];
    }

    clone() {
        var criteria = new MutationFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default MutationFilters;