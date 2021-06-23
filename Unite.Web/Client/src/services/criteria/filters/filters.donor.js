import Filters from './filters.js';

class DonorFilters extends Filters {
    id = [];
    referenceId = [];

    gender = [];
    age = { from: null, to: null };
    diagnosis = [];
    therapy = [];

    mtaProtected = null;
    workPackage = [];

    sanitise() {
        this.referenceId = this.sanitiseArray(this.referenceId);

        this.age = this.sanitiseRange(this.age);
        this.diagnosis = this.sanitiseArray(this.diagnosis);
        this.therapy = this.sanitiseArray(this.therapy);
        
        this.workPackage = this.sanitiseArray(this.workPackage);
    }
}

export default DonorFilters;