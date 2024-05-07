import SpecimenFiltersCriteria from "../../../_shared/specimens/models/filters/specimen-filters-criteria";
import { sanitiseArray, sanitiseRange, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class XenograftFiltersCriteria extends SpecimenFiltersCriteria {
    mouseStrain = [];
    survivalDays = { from: null, to: null };
    tumorigenicity = null;
    tumorGrowthForm = [];
    intervention = [];

    get numberOfFilters() {
        let number = super.numberOfFilters;
        
        number += this.mouseStrain?.length || 0;
        number += this.survivalDays?.from != null ? 1 : 0;
        number += this.survivalDays?.to != null ? 1 : 0;
        number += this.tumorigenicity != null ? 1 : 0;
        number += this.tumorGrowthForm?.length || 0;
        number += this.intervention?.length || 0;

        return number;
    }

    constructor(criteria = null) {
        super(criteria);

        this.mouseStrain = criteria?.mouseStrain || [];
        this.survivalDays = criteria?.survivalDays || { from: null, to: null };
        this.tumorigenicity = criteria?.tumorigenicity != null ? criteria.tumorigenicity : null;
        this.tumorGrowthForm = criteria?.tumorGrowthForm || [];
        this.intervention = criteria?.intervention || [];
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

        this.mouseStrain = sanitiseArray(this.mouseStrain);
        this.survivalDays = sanitiseRange(this.survivalDays);
        this.intervention = sanitiseArray(this.intervention);
    }

    clone() {
        let criteria = new XenograftFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}