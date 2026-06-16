import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";

export default class UmappAnalysis extends Analysis {
  type = AnalysisType.UMAPP;
  options = options;

  static create(datasets: any[]) {
    return new UmappAnalysis(datasets);
  }
}