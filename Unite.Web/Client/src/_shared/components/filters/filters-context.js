import DonorFiltersContext from "@/domain/donors/filters/donor-filters-context";
import MriFilterContext from "@/domain/images/mris/filters/mri-filters-context";
import TissueFiltersContext from "@/domain/specimens/tissues/filters/tissue-filters-context";
import CellFiltersContext from "@/domain/specimens/cells/filters/cell-filters-context";
import OrganoidFiltersContext from "@/domain/specimens/organoids/filters/organoid-filters-context";
import XenograftFiltersContext from "@/domain/specimens/xenografts/filters/xenograft-filters-context";
import GeneFiltersContext from "@/domain/genome/genes/filters/gene-filters-context";
import SsmFiltersContext from "@/domain/genome/variants/ssms/filters/ssm-filters-context";
import CnvFiltersContext from "@/domain/genome/variants/cnvs/filters/cnv-filters-context";
import SvFiltersContext from "@/domain/genome/variants/svs/filters/sv-filters-context";
import OncogridFiltersContext from "@/visualization/oncogrid/filters/oncogrid-filters-context";

export default class FiltersContext {
    donor = new DonorFiltersContext();
    mri = new MriFilterContext();
    tissue = new TissueFiltersContext();
    cell = new CellFiltersContext();
    organoid = new OrganoidFiltersContext();
    xenograft = new XenograftFiltersContext();
    gene = new GeneFiltersContext();
    ssm = new SsmFiltersContext();
    cnv = new CnvFiltersContext();
    sv = new SvFiltersContext();
    oncogrid = new OncogridFiltersContext();
}