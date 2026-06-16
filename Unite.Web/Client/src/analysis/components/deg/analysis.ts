import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";

export default class DegAnalysis extends Analysis {
  type = AnalysisType.DEG;
  options = null;

  static create(datasets: any[]) {
    return new DegAnalysis(datasets);
  }
}