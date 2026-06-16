import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";

export default class SurvAnalysis extends Analysis {
  type = AnalysisType.SURV;
  options = options;

  convertOptions(): any {
    let options = super.convertOptions();
    options.progression = options.progression === "true";

    return options;
  }

  static create(datasets: any[]) {
    return new SurvAnalysis(datasets);
  }
}