import DonorFilters from './filters/filters.donor.js';
import TissueFilters from './filters/filters.tissue.js';
import CellLineFilters from './filters/filters.cell.js';
import OrganoidFilters from "./filters/filters.organoid.js";
import XenograftFilters from "./filters/filters.xenograft.js";
import GeneFilters from './filters/filters.gene.js';
import MutationFilters from './filters/filters.mutation.js';
import OncoGridFilters from './filters/filters.oncogrid.js';

class SearchCriteria {
    from = 0;
    size = 10;
    term = null;
    donorFilters = new DonorFilters();
    tissueFilters = new TissueFilters();
    cellLineFilters = new CellLineFilters();
    organoidFilters = new OrganoidFilters();
    xenograftFilters = new XenograftFilters();
    geneFilters = new GeneFilters();
    mutationFilters = new MutationFilters();
    oncoGridFilters = new OncoGridFilters();

    clear() {
        this.donorFilters?.clear();
        this.tissueFilters?.clear();
        this.cellLineFilters?.clear();
        this.organoidFilters?.clear();
        this.xenograftFilters?.clear();
        this.geneFilters?.clear();
        this.mutationFilters?.clear();
    }

    clone() {
        var criteria = new SearchCriteria();
        criteria.from = this.from;
        criteria.size = this.size;
        criteria.term = this.term;
        criteria.donorFilters = this.donorFilters?.clone();
        criteria.tissueFilters = this.tissueFilters?.clone();
        criteria.cellLineFilters = this.cellLineFilters?.clone();
        criteria.organoidFilters = this.organoidFilters?.clone();
        criteria.xenograftFilters = this.xenograftFilters?.clone();
        criteria.geneFilters = this.geneFilters?.clone();
        criteria.mutationFilters = this.mutationFilters?.clone();
        criteria.oncoGridFilters = this.oncoGridFilters?.clone();

        return criteria;
    }
}

export default SearchCriteria;