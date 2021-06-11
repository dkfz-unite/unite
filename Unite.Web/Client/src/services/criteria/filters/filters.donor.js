import Filters from './filters.js';

class DonorFilters extends Filters {
    id = [];
    referenceId = [];
    
    gender = [];
    age = { from: null, to: null };
    diagnosis = [];
    
    sanitise(){
        this.referenceId = this.sanitiseArray(this.referenceId);
        
        this.diagnosis = this.sanitiseArray(this.diagnosis);
        this.age = this.sanitiseRange(this.age);
    }
}

export default DonorFilters;