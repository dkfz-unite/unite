import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import { OptionsGroup } from "../_shared/options";
import options from "./options";

export default class CedpAnalysis extends Analysis {
  type = AnalysisType.CEDP;
  options = options;

  static create(datasets: OptionsGroup[]) {
    return new CedpAnalysis(datasets);
  }
}