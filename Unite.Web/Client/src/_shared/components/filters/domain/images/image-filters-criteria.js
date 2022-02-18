import { sanitiseArray, copy } from "../../filter-criteria-helpers";

export default class ImageFiltersCriteria {
    id = [];
    referenceId = [];

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length || 0;
        number += this.referenceId?.length || 0;

        return number;
    }

    constructor(criteria = null){
        this.id = criteria?.id || [];
        this.referenceId = criteria?.referenceId || [];
    }

    sanitise(){
        this.id = sanitiseArray(this.id, true);
        this.referenceId = sanitiseArray(this.referenceId);
    }

    clear() {
        this.id = [];
        this.referenceId = [];
    }

    clone() {
        let criteria = new ImageFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}