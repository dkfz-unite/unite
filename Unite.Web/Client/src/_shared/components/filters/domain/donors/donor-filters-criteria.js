import { sanitiseArray, sanitiseRange, sanitiseThreshold, copy } from "../../filter-criteria-helpers";

export default class DonorFiltersCriteria {
    id = [];
    referenceId = [];

    gender = [];
    age = { from: null, to: null };
    diagnosis = [];
    vitalStatus = null;
    vitalStatusChangeDay = { from: null, to: null };
    progressionStatus = null;
    progressionStatusChangeDay = { from: null, to: null };
    therapy = [];

    mtaProtected = null;
    project = [];

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length || 0;
        number += this.referenceId?.length || 0;
        number += this.gender?.length || 0;
        number += this.age?.from != null ? 1 : 0;
        number += this.age?.to != null ? 1 : 0;
        number += this.diagnosis?.length || 0;
        number += this.vitalStatus != null ? 1 : 0;
        number += this.vitalStatusChangeDay.from != null ? 1 : 0;
        number += this.vitalStatusChangeDay.to != null ? 1 : 0;
        number += this.progressionStatus != null ? 1 : 0;
        number += this.progressionStatusChangeDay.from != null ? 1 : 0;
        number += this.progressionStatusChangeDay.to != null ? 1 : 0;
        number += this.therapy?.length || 0;
        number += this.mtaProtected != null ? 1 : 0;
        number += this.project?.length || 0;

        return number;
    }

    constructor(criteria = null) {
        this.id = criteria?.id || [];
        this.referenceId = criteria?.referenceId || [];
        this.gender = criteria?.gender || [];
        this.age = criteria?.age || { from: null, to: null };
        this.diagnosis = criteria?.diagnosis || [];
        this.vitalStatus = criteria?.vitalStatus || null;
        this.vitalStatusChangeDay = criteria?.vitalStatusChangeDay || { from: null, to: null };
        this.progressionStatus = criteria?.progressionStatus || null;
        this.progressionStatusChangeDay = criteria?.progressionStatusChangeDay || { from: null, to: null };
        this.therapy = criteria?.therapy || [];
        this.mtaProtected = criteria?.mtaProtected || null;
        this.project = criteria?.project || [];
    }

    sanitise() {
        this.id = sanitiseArray(this.id, true);
        this.referenceId = sanitiseArray(this.referenceId);

        this.age = sanitiseRange(this.age);
        this.diagnosis = sanitiseArray(this.diagnosis);
        this.vitalStatusChangeDay = sanitiseRange(this.vitalStatusChangeDay);
        this.progressionStatusChangeDay = sanitiseRange(this.progressionStatusChangeDay);
        this.therapy = sanitiseArray(this.therapy);
        
        this.project = sanitiseArray(this.project);
    }

    clear() {
        this.id = [];
        this.referenceId = [];

        this.gender = [];
        this.age = { from: null, to: null };
        this.diagnosis = [];
        this.vitalStatus = null;
        this.vitalStatusChangeDay = { from: null, to: null };
        this.progressionStatus = null;
        this.progressionStatusChangeDay = { from: null, to: null };
        this.therapy = [];

        this.mtaProtected = null;
        this.project = [];
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