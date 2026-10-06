import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";

export default class CedpAnalysis extends Analysis {
  type = AnalysisType.CNVP;
  options = options;
}