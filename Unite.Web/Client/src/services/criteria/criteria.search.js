import DonorFilters from './filters/filters.donor.js';
import TissueFilters from './filters/filters.tissue.js';
import CellLineFilters from './filters/filters.cell.js';
import OrganoidFilters from "./filters/filters.organoid.js";
import XenograftFilters from "./filters/filters.xenograft.js";
import MutationFilters from './filters/filters.mutation.js';

class SearchCriteria {
    from = 0;
    size = 10;
    term = null;
    donorFilters = new DonorFilters();
    tissueFilters = new TissueFilters();
    cellLineFilters = new CellLineFilters();
    organoidFilters = new OrganoidFilters();
    xenograftFilters = new XenograftFilters();
    mutationFilters = new MutationFilters();
}

export default SearchCriteria;