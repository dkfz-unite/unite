import DonorFiltersContext from "./domain/donors/donor-filters-context";
import MriFilterContext from "./domain/images/mris/mri-filters-context";
import TissueFiltersContext from "./domain/specimens/tissues/tissue-filters-context";
import CellFiltersContext from "./domain/specimens/cells/cell-filters-context";
import OrganoidFiltersContext from "./domain/specimens/organoids/organoid-filters-context";
import XenograftFiltersContext from "./domain/specimens/xenografts/xenograft-filters-context";
import GeneFiltersContext from "./domain/genome/genes/gene-filters-context";
import MutationFiltersContext from "./domain/genome/variants/ssm/ssm-filters-context";
import CopyNumberVariantFiltersContext from "./domain/genome/variants/cnv/cnv-filters-context";
import StructuralVariantFiltersContext from "./domain/genome/variants/sv/sv-filters-context";
import OncogridFiltersContext from "./analysis/oncogrid/oncogrid-filters-context";

export default class FiltersContext {
    donor = new DonorFiltersContext();
    mri = new MriFilterContext();
    tissue = new TissueFiltersContext();
    cell = new CellFiltersContext();
    organoid = new OrganoidFiltersContext();
    xenograft = new XenograftFiltersContext();
    gene = new GeneFiltersContext();
    ssm = new MutationFiltersContext();
    cnv = new CopyNumberVariantFiltersContext();
    sv = new StructuralVariantFiltersContext();
    oncogrid = new OncogridFiltersContext();
}