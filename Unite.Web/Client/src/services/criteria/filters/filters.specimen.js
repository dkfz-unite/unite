import Filters from './filters.js';

class SpecimenFilters extends Filters{
    referenceId = [];

    mgmtStatus = [];
    idhStatus = [];
    idhMutation = [];
    geneExpressionSubtype = [];
    methylationSubtype = [];
    gCimpMethylation = null;

    get numberOfFilters() {
        let number = 0;
        
        number += this.referenceId?.length ? this.referenceId.length : 0;

        number += this.mgmtStatus?.length ? this.mgmtStatus.length : 0;
        number += this.idhStatus?.length ? this.idhStatus.length : 0;
        number += this.idhMutation?.length ? this.idhMutation.length : 0;
        number += this.geneExpressionSubtype?.length ? this.geneExpressionSubtype.length : 0;
        number += this.methylationSubtype?.length ? this.methylationSubtype.length : 0;
        number += this.gCimpMethylation != null && this.gCimpMethylation != undefined ? 1 : 0;

        return number;
    }

    sanitise(){
        this.referenceId = this.sanitiseArray(this.referenceId);
    }

    clear() {
        this.referenceId = [];

        this.mgmtStatus = [];
        this.idhStatus = [];
        this.idhMutation = [];
        this.geneExpressionSubtype = [];
        this.methylationSubtype = [];
        this.gCimpMethylation = null;
    }

    clone() {
        var criteria = new SpecimenFilters();
        Object.assign(criteria, this);

        return criteria;
    }
}

export default SpecimenFilters;