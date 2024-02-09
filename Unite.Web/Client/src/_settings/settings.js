import HomeSettings from "@/home/settings";
import DonorsSettings from "@/domain/donors/settings";
import MrisSettings from "@/domain/images/mris/settings";
import MaterialsSettings from "@/domain/specimens/tissues/settings";
import LinesSettings from "@/domain/specimens/cells/settings";
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
  static donors = DonorsSettings;
  static mris = MrisSettings;
  static materials = MaterialsSettings;
  static lines = LinesSettings;
  static organoids = OrganoidsSettings;
  static xenografts = XenograftsSettings;
  static genes = GenesSettings;
  static ssms = SsmsSettings;
  static cnvs = CnvsSettings;
  static svs = SvsSettings;
  static analysis = AnalysisSettings;
  static datasets = DatasetsSettings;
}
