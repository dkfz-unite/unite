import SpecimenFilters from './filters.specimen.js';

class XenograftFilters extends SpecimenFilters {
    mouseStrain = [];
    intervention = [];
    survivalDays = { from: null, to: null };
    tumorigenicity = null;
    tumorGrowthForm = [];

    sanitise() {
        super.sanitise();

        this.mouseStrain = this.sanitiseArray(this.mouseStrain);
        this.intervention = this.sanitiseArray(this.intervention);
        this.survivalDays = this.sanitiseRange(this.survivalDays);
    }
}

export default XenograftFilters;