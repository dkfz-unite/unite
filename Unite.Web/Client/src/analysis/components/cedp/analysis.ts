import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";
import { keys } from "./options";

export default class CedpAnalysis extends Analysis {
  type = AnalysisType.CEDP;
  options = options;

  canSubmit(): boolean {
    const feature = this.findOption(keys.feature_type);
    const gene = this.findOption(keys.gene);
    const protein = this.findOption(keys.protein);
    const conditionProperty = this.findOption(keys.condition_property);
    
    return conditionProperty.value != null &&
           ((feature.value === "gene" && gene.value != null) ||
            (feature.value === "protein" && protein.value != null));
  }

  convertOptions() {
    let options = super.convertOptions();
    options.feature = options.gene || options.protein;
    delete options.gene;
    delete options.protein;

    return options;
  }
}