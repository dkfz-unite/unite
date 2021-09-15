import Filters from './filters.js';

class DonorFilters extends Filters {
    id = [];
    referenceId = [];

    gender = [];
    age = { from: null, to: null };
    diagnosis = [];
    vitalStatus = null;
    therapy = [];

    mtaProtected = null;
    workPackage = [];

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length ? this.id.length : 0;
        number += this.referenceId?.length ? this.referenceId.length : 0;

        number += this.gender?.length ? this.gender.length : 0;
        number += this.age?.from != null && this.age?.from != undefined ? 1 : 0;
        number += this.age?.to != null && this.age?.to != undefined ? 1 : 0;
        number += this.diagnosis?.length ? this.diagnosis.length : 0;
        number += this.vitalStatus != null && this.vitalStatus != undefined ? 1 : 0;
        number += this.therapy?.length ? this.therapy.length : 0;

        number += this.mtaProtected != null && this.mtaProtected != undefined ? 1 : 0;
        number += this.workPackage?.length ? this.workPackage.length : 0;

        return number;
    }

    sanitise() {
        this.referenceId = this.sanitiseArray(this.referenceId);

        this.age = this.sanitiseRange(this.age);
        this.diagnosis = this.sanitiseArray(this.diagnosis);
        this.therapy = this.sanitiseArray(this.therapy);
        
        this.workPackage = this.sanitiseArray(this.workPackage);
    }

    clear() {
        this.id = [];
        this.referenceId = [];

        this.gender = [];
        this.age = { from: null, to: null };
        this.diagnosis = [];
        this.vitalStatus = null;
        this.therapy = [];

        this.mtaProtected = null;
        this.workPackage = [];
    }

    clone() {
        var criteria = new DonorFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default DonorFilters;