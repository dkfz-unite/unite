import Filters from './filters.js';

export const MAX_DONORS = 3000;
export const MAX_GENES = 100;

class OncoGridFilters extends Filters{
    mostAffectedDonorCount = 200;
    mostAffectedGeneCount = 50;

    sanitise(){
        this.mostAffectedDonorCount = this.mostAffectedDonorCount > MAX_DONORS ? MAX_DONORS : this.mostAffectedDonorCount;
        this.mostAffectedGeneCount = this.mostAffectedGeneCount > MAX_GENES ? MAX_GENES : this.mostAffectedGeneCount;
    }
}

export default OncoGridFilters;