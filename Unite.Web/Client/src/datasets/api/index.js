import Settings from "@/_settings/settings";
import ImageType from "@/domain/images/_shared/images/models/enums/image-type";
import SpecimenType from "@/domain/specimens/_shared/specimens/models/enums/specimen-type";
import VariantType from "@/domain/genome/variants/_shared/variants/models/enums/variant-type";
import DonorsApi from "@/domain/donors/api";
import ImagesApi from "@/domain/images/_shared/images/api";
import SpecimensApi from "@/domain/specimens/_shared/specimens/api";
import GenesApi from "@/domain/genome/genes/api";
import VariantsApi from "@/domain/genome/variants/_shared/variants/api";

const fasade = {
  [Settings.donors.domain]: new DonorsApi(),
  [Settings.mris.domain]: new ImagesApi(ImageType.Mri),
  [Settings.materials.domain]: new SpecimensApi(SpecimenType.Tissue),
  [Settings.lines.domain]: new SpecimensApi(SpecimenType.CellLine),
  [Settings.organoids.domain]: new SpecimensApi(SpecimenType.Organoid),
  [Settings.xenografts.domain]: new SpecimensApi(SpecimenType.Xenograft),
  [Settings.genes.domain]: new GenesApi(),
  [Settings.ssms.domain]: new VariantsApi(VariantType.SSM),
  [Settings.cnvs.domain]: new VariantsApi(VariantType.CNV),
  [Settings.svs.domain]: new VariantsApi(VariantType.SV),
};

export default fasade;
