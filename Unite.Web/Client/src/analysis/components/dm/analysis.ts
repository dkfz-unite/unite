import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";

export default class DmAnalysis extends Analysis {
  type = AnalysisType.DM;
  options = options;
}