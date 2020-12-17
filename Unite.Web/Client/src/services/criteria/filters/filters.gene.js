import Filters from './filters.js';

class GeneFilters extends Filters {
    id = [];
    name = [];

    sanitise(){
        this.id = this.sanitiseArray(this.id);
        this.name = this.sanitiseArray(this.name);
    }
}

export default GeneFilters;