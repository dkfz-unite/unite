import Settings from "@/_settings/settings";
import ImageType from "@/domain/images/_shared/images/models/enums/image-type";
import SpecimenType from "@/domain/specimens/_shared/specimens/models/enums/specimen-type";
import VariantType from "@/domain/omics/variants/_shared/variants/models/enums/variant-type";
import DonorsApi from "@/domain/donors/api";
import ImagesApi from "@/domain/images/_shared/images/api";
import SpecimensApi from "@/domain/specimens/_shared/specimens/api";
import GenesApi from "@/domain/omics/genes/api";
import VariantsApi from "@/domain/omics/variants/_shared/variants/api";

const fasade = {
  [Settings.donors.domain]: new DonorsApi(),
  [Settings.mrs.domain]: new ImagesApi(ImageType.MR),
  [Settings.materials.domain]: new SpecimensApi(SpecimenType.Material),
  [Settings.lines.domain]: new SpecimensApi(SpecimenType.Line),
  [Settings.organoids.domain]: new SpecimensApi(SpecimenType.Organoid),
  [Settings.xenografts.domain]: new SpecimensApi(SpecimenType.Xenograft),
  [Settings.genes.domain]: new GenesApi(),
  [Settings.sms.domain]: new VariantsApi(VariantType.SM),
  [Settings.cnvs.domain]: new VariantsApi(VariantType.CNV),
  [Settings.svs.domain]: new VariantsApi(VariantType.SV),
};

export default fasade;
