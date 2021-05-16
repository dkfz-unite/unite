import Filters from './filters.js';

class SpecimenFilters extends Filters{
    referenceId = [];

    idhStatus = [];
    idhMutation = [];
    methylationStatus = [];
    methylationSubtype = [];
    gcimpMethylation = null;

    sanitise(){
        this.referenceId = this.sanitiseArray(this.referenceId);
    }
}

export default SpecimenFilters;