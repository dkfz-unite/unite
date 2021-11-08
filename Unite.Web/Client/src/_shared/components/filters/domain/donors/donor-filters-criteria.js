import { sanitiseArray, sanitiseRange, copy } from "../../filter-criteria-helpers";

export default class DonorFiltersCriteria {
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
        
        number += this.id?.length || 0;
        number += this.referenceId?.length || 0;
        number += this.gender?.length || 0;
        number += this.age?.from != null ? 1 : 0;
        number += this.age?.to != null ? 1 : 0;
        number += this.diagnosis?.length || 0;
        number += this.vitalStatus != null ? 1 : 0;
        number += this.therapy?.length || 0;
        number += this.mtaProtected != null ? 1 : 0;
        number += this.workPackage?.length || 0;

        return number;
    }

    constructor(criteria = null) {
        this.id = criteria?.id || [];
        this.referenceId = criteria?.referenceId || [];
        this.gender = criteria?.gender || [];
        this.age = criteria?.age || { from: null, to: null };
        this.diagnosis = criteria?.diagnosis || [];
        this.vitalStatus = criteria?.vitalStatus || null;
        this.therapy = criteria?.therapy || [];
        this.mtaProtected = criteria?.mtaProtected || null;
        this.workPackage = criteria?.workPackage || [];
    }

    sanitise() {
        this.referenceId = sanitiseArray(this.referenceId);

        this.age = sanitiseRange(this.age);
        this.diagnosis = sanitiseArray(this.diagnosis);
        this.therapy = sanitiseArray(this.therapy);
        
        this.workPackage = sanitiseArray(this.workPackage);
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
        let criteria = new DonorFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}