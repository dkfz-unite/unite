import DonorFilters from './filters/filters.donor.js';
import CellLineFilters from './filters/filters.cell.js';
import MutationFilters from './filters/filters.mutation.js';
import GeneFilters from './filters/filters.gene.js';

class SearchCriteria{
    from = 0;
    size = 10;
    term = null;
    donorFilters = new DonorFilters();
    cellLineFilters = new CellLineFilters();
    mutationFilters = new MutationFilters();
    geneFilters = new GeneFilters();
}

export default SearchCriteria;