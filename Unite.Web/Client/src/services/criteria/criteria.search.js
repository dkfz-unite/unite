import DonorFilters from './filters/filters.donor.js';
import CellLineFilters from './filters/filters.cell.js';
import MutationFilters from './filters/filters.mutation.js';
import OncoGridFilters from './filters/filters.oncogrid';

class SearchCriteria{
    from = 0;
    size = 10;
    term = null;
    donorFilters = new DonorFilters();
    cellLineFilters = new CellLineFilters();
    mutationFilters = new MutationFilters();
    oncoGridFilters = new OncoGridFilters();
}

export default SearchCriteria;