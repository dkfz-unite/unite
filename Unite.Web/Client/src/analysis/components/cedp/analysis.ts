import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";
import { keys } from "./options";

export default class CedpAnalysis extends Analysis {
  override type = AnalysisType.CEDP;
  override options = options;

  override canStart(): boolean {
    const feature = this.findOption(keys.feature);
    const conditionProperty = this.findOption(keys.condition_property);

    return feature.value != null
        && conditionProperty.value != null;
  }

  static override canCreate(datasets: any[]): boolean {
    return datasets.length == 1 && datasets.every(dataset => dataset.data?.prot == true);
  }
}