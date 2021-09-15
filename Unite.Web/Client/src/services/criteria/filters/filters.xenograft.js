import SpecimenFilters from './filters.specimen.js';

class XenograftFilters extends SpecimenFilters {
    mouseStrain = [];
    survivalDays = { from: null, to: null };
    tumorigenicity = null;
    tumorGrowthForm = [];
    intervention = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.mouseStrain?.length ? this.mouseStrain.length : 0;
        number += this.survivalDays?.from != null && this.survivalDays?.from != undefined ? 1 : 0;
        number += this.survivalDays?.to != null && this.survivalDays?.to != undefined ? 1 : 0;
        number += this.tumorigenicity != null && this.tumorigenicity != undefined ? 1 : 0;
        number += this.tumorGrowthForm?.length ? this.tumorGrowthForm.length : 0;
        number += this.intervention?.length ? this.intervention.length : 0;

        return number;
    }

    clear() {
        super.clear();

        this.mouseStrain = [];
        this.survivalDays = { from: null, to: null };
        this.tumorigenicity = null;
        this.tumorGrowthForm = [];
        this.intervention = [];
    }

    sanitise() {
        super.sanitise();

        this.mouseStrain = this.sanitiseArray(this.mouseStrain);
        this.survivalDays = this.sanitiseRange(this.survivalDays);
        this.intervention = this.sanitiseArray(this.intervention);
    }

    clone() {
        var criteria = new XenograftFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default XenograftFilters;