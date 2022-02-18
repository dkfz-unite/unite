import DonorFiltersContext from "./domain/donors/donor-filters-context";
import TissueFiltersContext from "./domain/specimens/tissues/tissue-filters-context";
import CellFiltersContext from "./domain/specimens/cells/cell-filters-context";
import OrganoidFiltersContext from "./domain/specimens/organoids/organoid-filters-context";
import XenograftFiltersContext from "./domain/specimens/xenografts/xenograft-filters-context";
import GeneFiltersContext from "./domain/genome/genes/gene-filters-context";
import MutationFiltersContext from "./domain/genome/mutations/mutation-filters-context";
import MriFilterContext from "./domain/images/mris/mri-filters-context";

export default class FiltersContext {
    donorFiltersContext = new DonorFiltersContext();
    tissueFiltersContext = new TissueFiltersContext();
    cellFiltersContext = new CellFiltersContext();
    organoidFiltersContext = new OrganoidFiltersContext();
    xenograftFiltersContext = new XenograftFiltersContext();
    geneFiltersContext = new GeneFiltersContext();
    mutationFiltersContext = new MutationFiltersContext();
    mriFiltersContext = new MriFilterContext();
}