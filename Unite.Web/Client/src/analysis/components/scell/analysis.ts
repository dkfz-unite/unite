import Analysis from "../_shared/analysis";
import AnalysisType from "../_shared/analysis-type";
import options from "./options";
import { keys } from "./options";

export default class ScellAnalysis extends Analysis {
  type = AnalysisType.SCELL;
  options = options;

  canSubmit(): boolean {
    const embedding = this.findOption(keys.embedding);
    
    return embedding.value?.length > 0;
  }

  override toPayload() {
    const payload = super.toPayload();

    payload.data.annotations = this.findOption(keys.annotations).value?.text();
    delete payload[keys.annotations];

    return payload;
  }
}