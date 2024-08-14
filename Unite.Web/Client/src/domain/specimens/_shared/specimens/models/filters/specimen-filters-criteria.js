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

    hasSsms = null;
    hasCnvs = null;
    hasSvs = null;
    hasGeneExp = null;
    hasGeneExpSc = null;

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
        number += this.hasSsms != null ? 1 : 0;
        number += this.hasCnvs != null ? 1 : 0;
        number += this.hasSvs != null ? 1 : 0;
        number += this.hasGeneExp != null ? 1 : 0;
        number += this.hasGeneExpSc != null ? 1 : 0;

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
        this.hasSsms = criteria?.hasSsms != null ? criteria.hasSsms : null;
        this.hasCnvs = criteria?.hasCnvs != null ? criteria.hasCnvs : null;
        this.hasSvs = criteria?.hasSvs != null ? criteria.hasSvs : null;
        this.hasGeneExp = criteria?.hasGeneExp != null ? criteria.hasGeneExp : null;
        this.hasGeneExpSc = criteria?.hasGeneExpSc != null ? criteria.hasGeneExpSc : null;
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
        this.hasSsms = null;
        this.hasCnvs = null;
        this.hasSvs = null;
        this.hasGeneExp = null;
        this.hasGeneExpSc = null;
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