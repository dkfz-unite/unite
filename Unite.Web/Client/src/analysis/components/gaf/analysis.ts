import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";
import { keys } from "./options";

export default class CedpAnalysis extends Analysis {
  type = AnalysisType.GAF;
  options = options;

  canSubmit(): boolean {
    const sm = this.findOption(keys.sm);
    
    return sm.value?.length > 0;
  }
}