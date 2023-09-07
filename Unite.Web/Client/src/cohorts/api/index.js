import DomainNames from "@/_models/domain/domain-names";
import DonorsApi from "@/domain/donors/api";
import ImagesApi from "@/domain/images/_shared/api/images";
import SpecimensApi from "@/domain/specimens/_shared/api/specimens";
import GenesApi from "@/domain/genome/genes/api";
import VariantsApi from "@/domain/genome/variants/_shared/api/variants";

const fasade = {
  [DomainNames.Donors]: new DonorsApi(),
  [DomainNames.Mris]: new ImagesApi("MRI"),
  [DomainNames.Tissues]: new SpecimensApi("Tissue"),
  [DomainNames.Cells]: new SpecimensApi("CellLine"),
  [DomainNames.Organoids]: new SpecimensApi("Organoid"),
  [DomainNames.Xenografts]: new SpecimensApi("Xenograft"),
  [DomainNames.Genes]: new GenesApi(),
  [DomainNames.Ssms]: new VariantsApi("SSM"),
  [DomainNames.Cnvs]: new VariantsApi("CNV"),
  [DomainNames.Svs]: new VariantsApi("SV"),
};

export default fasade;
