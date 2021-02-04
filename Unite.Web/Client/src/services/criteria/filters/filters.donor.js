import Filters from './filters.js';

class DonorFilters extends Filters{
    id = [];
    diagnosis = [];

    gender = [];
    vitalStatus = [];
    ageCategory = [];
    age = { from: null, to: null };

    geneExpressionSubtype = [];
    idhStatus = [];
    idhMutation = [];
    methylationStatus = [];
    methylationSubtype = [];
    gcimpMethylation = null;
    
    sanitise(){
        this.id = this.sanitiseArray(this.id);
        this.diagnosis = this.sanitiseArray(this.diagnosis);
        this.age = this.sanitiseRange(this.age);
    }
}

export default DonorFilters;