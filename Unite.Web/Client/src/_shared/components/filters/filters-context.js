import DonorFiltersContext from "@/domain/donors/models/filters/donor-filters-context";
import MrFilterContext from "@/domain/images/mrs/models/filters/mr-filters-context";
import MaterialFiltersContext from "@/domain/specimens/materials/models/filters/material-filters-context";
import LineFiltersContext from "@/domain/specimens/lines/models/filters/line-filters-context";
import OrganoidFiltersContext from "@/domain/specimens/organoids/models/filters/organoid-filters-context";
import XenograftFiltersContext from "@/domain/specimens/xenografts/models/filters/xenograft-filters-context";
import GeneFiltersContext from "@/domain/genome/genes/models/filters/gene-filters-context";
import SmFiltersContext from "@/domain/genome/variants/sms/models/filters/sm-filters-context";
import CnvFiltersContext from "@/domain/genome/variants/cnvs/models/filters/cnv-filters-context";
import SvFiltersContext from "@/domain/genome/variants/svs/models/filters/sv-filters-context";
import OncogridFiltersContext from "@/visualization/oncogrid/filters/oncogrid-filters-context";

export default class FiltersContext {
    donor = new DonorFiltersContext();
    mr = new MrFilterContext();
    material = new MaterialFiltersContext();
    line = new LineFiltersContext();
    organoid = new OrganoidFiltersContext();
    xenograft = new XenograftFiltersContext();
    gene = new GeneFiltersContext();
    sm = new SmFiltersContext();
    cnv = new CnvFiltersContext();
    sv = new SvFiltersContext();
    oncogrid = new OncogridFiltersContext();
}