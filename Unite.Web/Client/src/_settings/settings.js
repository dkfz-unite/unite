import HomeSettings from "@/home/settings";
import DonorSettings from "@/domain/donor/settings";
import DonorsSettings from "@/domain/donors/settings";
import MrisSettings from "@/domain/images/mris/settings";
import MaterialSettings from "@/domain/specimens/tissue/settings";
import MaterialsSettings from "@/domain/specimens/tissues/settings";
import LineSettings from "@/domain/specimens/cell/settings";
import LinesSettings from "@/domain/specimens/cells/settings";
import OrganoidSettings from "@/domain/specimens/organoid/settings";
import OrganoidsSettings from "@/domain/specimens/organoids/settings";
import XenograftsSettings from "@/domain/specimens/xenografts/settings";
import GenesSettings from "@/domain/genome/genes/settings";
import SsmsSettings from "@/domain/genome/variants/ssms/settings";
import CnvsSettings from "@/domain/genome/variants/cnvs/settings";
import SvsSettings from "@/domain/genome/variants/svs/settings";
import AnalysisSettings from "@/analysis/settings";
import DatasetsSettings from "@/cohorts/settings";

export default class Settings {
  static home = HomeSettings;
  static donor = DonorSettings;
  static donors = DonorsSettings;
  static mris = MrisSettings;
  static material = MaterialSettings;
  static materials = MaterialsSettings;
  static line = LineSettings;
  static lines = LinesSettings;
  static organoid = OrganoidSettings;
  static organoids = OrganoidsSettings;
  static xenografts = XenograftsSettings;
  static genes = GenesSettings;
  static ssms = SsmsSettings;
  static cnvs = CnvsSettings;
  static svs = SvsSettings;
  static analysis = AnalysisSettings;
  static datasets = DatasetsSettings;
}
