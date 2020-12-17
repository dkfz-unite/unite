import Filters from './filters.js';

class DonorFilters extends Filters{
    id = [];
    diagnosis = [];

    gender = [];
    vitalStatus = [];
    ageCategory = [];
    age = { from: null, to: null };
    
    sanitise(){
        this.id = this.sanitiseArray(this.id);
        this.age = this.sanitiseRange(this.age);
    }
}

export default DonorFilters;