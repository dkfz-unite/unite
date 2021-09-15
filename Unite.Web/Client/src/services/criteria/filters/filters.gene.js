import Filters from './filters.js';

class GeneFilters extends Filters{
    id = [];

    symbol = [];
    biotype = [];
    chromosome = [];
    position = { from: null, to: null };

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length ? this.id.length : 0;

        number += this.symbol?.length ? this.symbol.length : 0;
        number += this.biotype?.length ? this.biotype.length : 0;
        number += this.chromosome?.length ? this.chromosome.length : 0;
        number += this.position?.from != null && this.position?.from != undefined ? 1 : 0;
        number += this.position?.to != null && this.position?.to != undefined ? 1 : 0;

        return number;
    }

    sanitise(){
        this.symbol = this.sanitiseArray(this.symbol);
        this.position = this.sanitiseRange(this.position);
    }

    clear() {
        this.id = [];

        this.symbol = [];
        this.biotype = [];
        this.chromosome = [];
        this.position = { from: null, to: null };
    }

    clone() {
        var criteria = new GeneFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default GeneFilters;