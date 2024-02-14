import Settings from "@/_settings/settings";
import DonorsApi from "@/domain/donors/api";
import ImagesApi from "@/domain/images/_shared/images/api";
import SpecimensApi from "@/domain/specimens/_shared/specimens/api";
import GenesApi from "@/domain/genome/genes/api";
import VariantsApi from "@/domain/genome/variants/_shared/variants/api";

const fasade = {
  [Settings.donors.domain]: new DonorsApi(),
  [Settings.mris.domain]: new ImagesApi("MRI"),
  [Settings.materials.domain]: new SpecimensApi("Material"),
  [Settings.lines.domain]: new SpecimensApi("Line"),
  [Settings.organoids.domain]: new SpecimensApi("Organoid"),
  [Settings.xenografts.domain]: new SpecimensApi("Xenograft"),
  [Settings.genes.domain]: new GenesApi(),
  [Settings.ssms.domain]: new VariantsApi("SSM"),
  [Settings.cnvs.domain]: new VariantsApi("CNV"),
  [Settings.svs.domain]: new VariantsApi("SV"),
};

export default fasade;
