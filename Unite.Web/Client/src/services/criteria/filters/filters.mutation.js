import Filters from './filters.js';

class MutationFilters extends Filters{
    id = [];
    code = [];
    sequenceType = [];
    mutationType = [];
    contig = [];
    chromosome = [];
    position = { from: null, to: null }

    sanitise(){
        this.id = this.sanitiseArray(this.id);
        this.code = this.sanitiseArray(this.code);
        this.sequenceType = this.sanitiseArray(this.sequenceType);
        this.mutationType = this.sanitiseArray(this.mutationType);
        this.contig = this.sanitiseArray(this.contig);
        this.chromosome = this.sanitiseArray(this.chromosome);

        this.position = !this.chromosome || this.chromosome.length != 1
            ? this.sanitiseRange(null)
            : this.sanitiseRange(this.position);
    }
}

export default MutationFilters;