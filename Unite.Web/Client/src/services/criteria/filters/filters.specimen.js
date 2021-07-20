import Filters from './filters.js';

class SpecimenFilters extends Filters{
    referenceId = [];

    mgmtStatus = [];
    idhStatus = [];
    idhMutation = [];
    geneExpressionSubtype = [];
    methylationSubtype = [];
    gCimpMethylation = null;

    sanitise(){
        this.referenceId = this.sanitiseArray(this.referenceId);
    }
}

export default SpecimenFilters;