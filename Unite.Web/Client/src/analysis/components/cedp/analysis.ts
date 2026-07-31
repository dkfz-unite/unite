import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";
import { keys } from "./options";

export default class CedpAnalysis extends Analysis {
  type = AnalysisType.CEDP;
  options = options;

  canSubmit(): boolean {
    const featureName = this.findOption(keys.feature_name);
    const conditionProperty = this.findOption(keys.condition_property);
    
    return featureName.value != null && conditionProperty.value != null;
  }
}