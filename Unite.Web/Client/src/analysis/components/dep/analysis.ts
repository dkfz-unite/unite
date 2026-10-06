import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";

export default class DepAnalysis extends Analysis {
  type = AnalysisType.DEP;
  options = options;
}