import { sanitiseArray, copy } from "../../filter-criteria-helpers";

export default class SpecimenFiltersCriteria {
    id = [];
    referenceId = [];
    mgmtStatus = [];
    idhStatus = [];
    idhMutation = [];
    geneExpressionSubtype = [];
    methylationSubtype = [];
    gCimpMethylation = null;

    get numberOfFilters() {
        let number = 0;
        
        number += this.id?.length || 0;
        number += this.referenceId?.length || 0;
        number += this.mgmtStatus?.length || 0;
        number += this.idhStatus?.length || 0;
        number += this.idhMutation?.length || 0;
        number += this.geneExpressionSubtype?.length || 0;
        number += this.methylationSubtype?.length || 0;
        number += this.gCimpMethylation != null ? 1 : 0;

        return number;
    }

    constructor(criteria = null){
        this.id = criteria?.id || [];
        this.referenceId = criteria?.referenceId || [];
        this.mgmtStatus = criteria?.mgmtStatus || [];
        this.idhStatus = criteria?.idhStatus || [];
        this.idhMutation = criteria?.idhMutation || [];
        this.geneExpressionSubtype = criteria?.geneExpressionSubtype || [];
        this.methylationSubtype = criteria?.methylationSubtype || [];
        this.gCimpMethylation = criteria?.gCimpMethylation || null;
    }

    sanitise(){
        this.id = sanitiseArray(this.id);
        this.referenceId = sanitiseArray(this.referenceId);
    }

    clear() {
        this.id = [];
        this.referenceId = [];
        this.mgmtStatus = [];
        this.idhStatus = [];
        this.idhMutation = [];
        this.geneExpressionSubtype = [];
        this.methylationSubtype = [];
        this.gCimpMethylation = null;
    }

    clone() {
        let criteria = new SpecimenFilters();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}