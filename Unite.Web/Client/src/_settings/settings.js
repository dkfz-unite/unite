import HomeSettings from "@/home/settings";
import ProjectSettings from "@/domain/project/settings";
import ProjectsSettings from "@/domain/projects/settings";
import DonorSettings from "@/domain/donor/settings";
import DonorsSettings from "@/domain/donors/settings";
import MriSettings from "@/domain/images/mri/settings";
import MrisSettings from "@/domain/images/mris/settings";
import MaterialSettings from "@/domain/specimens/material/settings";
import MaterialsSettings from "@/domain/specimens/materials/settings";
import LineSettings from "@/domain/specimens/line/settings";
import LinesSettings from "@/domain/specimens/lines/settings";
import OrganoidSettings from "@/domain/specimens/organoid/settings";
import OrganoidsSettings from "@/domain/specimens/organoids/settings";
import XenograftSettings from "@/domain/specimens/xenograft/settings";
import XenograftsSettings from "@/domain/specimens/xenografts/settings";
import GeneSettings from "@/domain/genome/gene/settings";
import GenesSettings from "@/domain/genome/genes/settings";
import SsmSettings from "@/domain/genome/variants/ssm/settings";
import SsmsSettings from "@/domain/genome/variants/ssms/settings";
import CnvSettings from "@/domain/genome/variants/cnv/settings";
import CnvsSettings from "@/domain/genome/variants/cnvs/settings";
import SvSettings from "@/domain/genome/variants/sv/settings";
import SvsSettings from "@/domain/genome/variants/svs/settings";
import SubmissionsSettings from "@/domain/submissions/settings";
import AnalysisSettings from "@/analysis/settings";
import DatasetsSettings from "@/datasets/settings";

export default class Settings {
  static home = HomeSettings;
  static project = ProjectSettings;
  static projects = ProjectsSettings;
  static donor = DonorSettings;
  static donors = DonorsSettings;
  static mri = MriSettings;
  static mris = MrisSettings;
  static material = MaterialSettings;
  static materials = MaterialsSettings;
  static line = LineSettings;
  static lines = LinesSettings;
  static organoid = OrganoidSettings;
  static organoids = OrganoidsSettings;
  static xenograft = XenograftSettings;
  static xenografts = XenograftsSettings;
  static gene = GeneSettings;
  static genes = GenesSettings;
  static ssm = SsmSettings;
  static ssms = SsmsSettings;
  static cnv = CnvSettings;
  static cnvs = CnvsSettings;
  static sv = SvSettings;
  static svs = SvsSettings;
  static submissions = SubmissionsSettings;
  static analysis = AnalysisSettings;
  static datasets = DatasetsSettings;

  static searchable = [
    this.donors,
    this.mris,
    this.materials,
    this.lines,
    this.organoids,
    this.xenografts,
    this.genes,
    this.ssms,
    this.cnvs,
    this.svs
  ]
}
