import { sanitiseArray, copy } from "@/_shared/components/filters/filter-criteria-helpers";

export default class SpecimenFiltersCriteria {
    id = [];
    referenceId = [];
    mgmtStatus = [];
    idhStatus = [];
    idhMutation = [];
    geneExpressionSubtype = [];
    methylationSubtype = [];
    gCimpMethylation = null;
    drug = [];
    dss = { from: null, to: null };
    dssSelective = { from: null, to: null };

    hasSms = null;
    hasCnvs = null;
    hasSvs = null;
    hasMeth = null;
    hasExp = null;
    hasExpSc = null;

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
        number += this.drug?.length || 0;
        number += this.dss?.from != null ? 1 : 0;
        number += this.dss?.to != null ? 1 : 0;
        number += this.dssSelective?.from != null ? 1 : 0;
        number += this.dssSelective?.to != null ? 1 : 0;
        number += this.hasSms != null ? 1 : 0;
        number += this.hasCnvs != null ? 1 : 0;
        number += this.hasSvs != null ? 1 : 0;
        number += this.hasMeth != null ? 1 : 0;
        number += this.hasExp != null ? 1 : 0;
        number += this.hasExpSc != null ? 1 : 0;

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
        this.gCimpMethylation = criteria?.gCimpMethylation != null ? criteria.gCimpMethylation : null;
        this.drug = criteria?.drug || [];
        this.dss = criteria?.dss || { from: null, to: null };
        this.dssSelective = criteria?.dssSelective || { from: null, to: null };
        this.hasSms = criteria?.hasSms != null ? criteria.hasSms : null;
        this.hasCnvs = criteria?.hasCnvs != null ? criteria.hasCnvs : null;
        this.hasSvs = criteria?.hasSvs != null ? criteria.hasSvs : null;
        this.hasMeth = criteria?.hasMeth != null ? criteria.hasMeth : null;
        this.hasExp = criteria?.hasExp != null ? criteria.hasExp : null;
        this.hasExpSc = criteria?.hasExpSc != null ? criteria.hasExpSc : null;
    }

    sanitise(){
        this.id = sanitiseArray(this.id, true);
        this.referenceId = sanitiseArray(this.referenceId);
        this.drug = sanitiseArray(this.drug);
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
        this.drug = [];
        this.dss = { from: null, to: null };
        this.dssSelective = { from: null, to: null };
        this.hasSms = null;
        this.hasCnvs = null;
        this.hasSvs = null;
        this.hasMeth = null;
        this.hasExp = null;
        this.hasExpSc = null;
    }

    clone() {
        let criteria = new SpecimenFiltersCriteria();
        Object.assign(criteria, this);

        return criteria;
    }

    copy() {
        return copy(this);
    }
}