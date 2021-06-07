import Filters from './filters.js';

class MutationFilters extends Filters{
    code = [];
    sequenceType = [];
    mutationType = [];
    chromosome = [];
    position = { from: null, to: null };
    impact = [];
    consequence = [];
    gene = [];

    sanitise(){
        this.code = this.sanitiseArray(this.code);

        this.position = !this.chromosome || this.chromosome.length != 1
            ? this.sanitiseRange(null)
            : this.sanitiseRange(this.position);

        this.gene = this.sanitiseArray(this.gene);
    }
}

export default MutationFilters;