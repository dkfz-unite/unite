import DonorFiltersCriteria from "./domain/donors/donor-filters-criteria";
import TissueFiltersCriteria from "./domain/specimens/tissues/tissue-filters-criteria";
import CellFiltersCriteria from "./domain/specimens/cells/cell-filters-criteria";
import OrganoidFiltersCriteria from "./domain/specimens/organoids/organoid-filters-criteria";
import XenograftFiltersCriteria from "./domain/specimens/xenografts/xenograft-filters-criteria";
import GeneFiltersCriteria from "./domain/genome/genes/gene-filters-criteria";
import MutationFiltersCriteria from "./domain/genome/mutations/mutation-filters-criteria";
import MriFiltersCriteria from "./domain/images/mris/mri-filters-criteria";
import OncogirdFiltersCriteria from "./visualization/oncogrid/oncogrid-filters-criteria";

// This class is used only inside this file, all side assignments still use object.
class Filters {
    query = null;
    from = 0;
    size = 20;

    constructor(filters = null) {
        this.query = filters?.query || null;
    }
}

export default class FiltersCriteria {
    filters = new Filters();
    donorFiltersCriteria = new DonorFiltersCriteria();
    tissueFiltersCriteria = new TissueFiltersCriteria();
    cellFiltersCriteria = new CellFiltersCriteria();
    organoidFiltersCriteria = new OrganoidFiltersCriteria();
    xenograftFiltersCriteria = new XenograftFiltersCriteria();
    geneFiltersCriteria = new GeneFiltersCriteria();
    mutationFiltersCriteria = new MutationFiltersCriteria();
    mriFiltersCriteria = new MriFiltersCriteria();
    oncogridFiltersCriteria = new OncogirdFiltersCriteria();

    get numberOfFilters() {
        let number = 0;

        number += this.filters.query != null ? 1 : 0;
        number += this.donorFiltersCriteria.numberOfFilters;
        number += this.tissueFiltersCriteria.numberOfFilters;
        number += this.cellFiltersCriteria.numberOfFilters;
        number += this.organoidFiltersCriteria.numberOfFilters;
        number += this.xenograftFiltersCriteria.numberOfFilters;
        number += this.geneFiltersCriteria.numberOfFilters;
        number += this.mutationFiltersCriteria.numberOfFilters;
        number += this.mriFiltersCriteria.numberOfFilters;

        return number;
    }

    constructor(criteria = null) {
        this.filters = new Filters(criteria?.filters);
        this.donorFiltersCriteria = new DonorFiltersCriteria(criteria?.donorFiltersCriteria);
        this.tissueFiltersCriteria = new TissueFiltersCriteria(criteria?.tissueFiltersCriteria);
        this.cellFiltersCriteria = new CellFiltersCriteria(criteria?.cellFiltersCriteria);
        this.organoidFiltersCriteria = new OrganoidFiltersCriteria(criteria?.organoidFiltersCriteria);
        this.xenograftFiltersCriteria = new XenograftFiltersCriteria(criteria?.xenograftFiltersCriteria);
        this.geneFiltersCriteria = new GeneFiltersCriteria(criteria?.geneFiltersCriteria);
        this.mutationFiltersCriteria = new MutationFiltersCriteria(criteria?.mutationFiltersCriteria);
        this.mriFiltersCriteria = new MriFiltersCriteria(criteria?.mriFiltersCriteria);
        this.oncogridFiltersCriteria = new OncogirdFiltersCriteria(criteria?.oncogridFiltersCriteria);
    }

    sanitise() {
        this.donorFiltersCriteria?.sanitise();
        this.tissueFiltersCriteria?.sanitise();
        this.cellFiltersCriteria?.sanitise();
        this.organoidFiltersCriteria?.sanitise();
        this.xenograftFiltersCriteria?.sanitise();
        this.geneFiltersCriteria?.sanitise();
        this.mutationFiltersCriteria?.sanitise();
        this.mriFiltersCriteria?.sanitise();
        this.oncogridFiltersCriteria?.sanitise();
    }

    clone() {
        var criteria = new FiltersCriteria();

        criteria.filters = {
            query: this.filters.query,
            from: this.filters.from,
            size: this.filters.size
        };
        criteria.donorFiltersCriteria = this.donorFiltersCriteria?.clone();
        criteria.tissueFiltersCriteria = this.tissueFiltersCriteria?.clone();
        criteria.cellFiltersCriteria = this.cellFiltersCriteria?.clone();
        criteria.organoidFiltersCriteria = this.organoidFiltersCriteria?.clone();
        criteria.xenograftFiltersCriteria = this.xenograftFiltersCriteria?.clone();
        criteria.geneFiltersCriteria = this.geneFiltersCriteria?.clone();
        criteria.mutationFiltersCriteria = this.mutationFiltersCriteria?.clone();
        criteria.mriFiltersCriteria = this.mriFiltersCriteria?.clone();
        criteria.oncogridFiltersCriteria = this.oncogridFiltersCriteria?.clone();

        return criteria;
    }

    copy() {
        const criteria = {};

        for (const property in this) {
            if (Object.hasOwnProperty.call(this, property)) {
                const value = this[property];
                if (value.copy != null) {
                    criteria[property] = value.copy();
                }
            }
        }

        return criteria;
    }

    clear() {
        this.filters.from = 0;
        this.filters.query = null;
        this.donorFiltersCriteria.clear();
        this.tissueFiltersCriteria.clear();
        this.cellFiltersCriteria.clear();
        this.organoidFiltersCriteria.clear();
        this.xenograftFiltersCriteria.clear();
        this.geneFiltersCriteria.clear();
        this.mutationFiltersCriteria.clear();
        this.mriFiltersCriteria.clear();
    }

    toSearchCriteria() {
        return {
            from: this.filters.from,
            size: this.filters.size,
            term: this.filters.query,
            donorFilters: this.donorFiltersCriteria,
            tissueFilters: this.tissueFiltersCriteria,
            cellLineFilters: this.cellFiltersCriteria,
            organoidFilters: this.organoidFiltersCriteria,
            xenograftFilters: this.xenograftFiltersCriteria,
            geneFilters: this.geneFiltersCriteria,
            mutationFilters: this.mutationFiltersCriteria,
            mriImageFilters: this.mriFiltersCriteria,
            oncoGridFilters: this.oncogridFiltersCriteria
        };
    }
}