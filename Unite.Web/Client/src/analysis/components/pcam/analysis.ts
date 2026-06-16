import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";

export default class PcamAnalysis extends Analysis {
  type = AnalysisType.PCAM;
  options = options;

  static create(datasets: any[]) {
    return new PcamAnalysis(datasets);
  }
}