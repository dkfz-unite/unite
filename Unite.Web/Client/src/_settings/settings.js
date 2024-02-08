import HomeSettings from "@/home/settings";
import DonorsSettings from "@/domain/donors/settings";
import MrisSettings from "@/domain/images/mris/settings";
import MaterialsSettings from "@/domain/specimens/tissues/settings";
import LinesSettings from "@/domain/specimens/cells/settings";

export default class Settings {
  static home = HomeSettings;
  static donors = DonorsSettings;
  static mris = MrisSettings;
  static materials = MaterialsSettings;
  static lines = LinesSettings;
}