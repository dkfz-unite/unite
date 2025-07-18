import DonorFiltersContext from "@/domain/donors/models/filters/donor-filters-context";
import MrFilterContext from "@/domain/images/mrs/models/filters/mr-filters-context";
import MaterialFiltersContext from "@/domain/specimens/materials/models/filters/material-filters-context";
import LineFiltersContext from "@/domain/specimens/lines/models/filters/line-filters-context";
import OrganoidFiltersContext from "@/domain/specimens/organoids/models/filters/organoid-filters-context";
import XenograftFiltersContext from "@/domain/specimens/xenografts/models/filters/xenograft-filters-context";
import GeneFiltersContext from "@/domain/omics/genes/models/filters/gene-filters-context";
import SmFiltersContext from "@/domain/omics/variants/sms/models/filters/sm-filters-context";
import CnvFiltersContext from "@/domain/omics/variants/cnvs/models/filters/cnv-filters-context";
import SvFiltersContext from "@/domain/omics/variants/svs/models/filters/sv-filters-context";
import OncogridFiltersContext from "@/visualization/oncogrid/filters/oncogrid-filters-context";

export default class FiltersContext {
  donor: DonorFiltersContext = new DonorFiltersContext();
  mr: MrFilterContext = new MrFilterContext();
  material: MaterialFiltersContext = new MaterialFiltersContext();
  line: LineFiltersContext = new LineFiltersContext();
  organoid: OrganoidFiltersContext = new OrganoidFiltersContext();
  xenograft: XenograftFiltersContext = new XenograftFiltersContext();
  gene: GeneFiltersContext = new GeneFiltersContext();
  sm: SmFiltersContext = new SmFiltersContext();
  cnv: CnvFiltersContext = new CnvFiltersContext();
  sv: SvFiltersContext = new SvFiltersContext();
  oncogrid: OncogridFiltersContext = new OncogridFiltersContext();
}