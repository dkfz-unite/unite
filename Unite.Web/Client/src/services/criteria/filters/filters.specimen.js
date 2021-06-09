import Filters from './filters.js';

class SpecimenFilters extends Filters{
    referenceId = [];

    geneExpressionSubtype = [];
    idhStatus = [];
    idhMutation = [];
    methylationStatus = [];
    methylationType = [];
    gCimpMethylation = null;

    sanitise(){
        this.referenceId = this.sanitiseArray(this.referenceId);
    }
}

export default SpecimenFilters;