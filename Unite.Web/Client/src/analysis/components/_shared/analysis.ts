import AnalysisType from "./analysis-type";
import { OptionsGroup } from "./options";

export default class Analysis {
  type: AnalysisType;
  name: string;
  description: string;
  datasets: any[];
  options: OptionsGroup[];

  reset(): void {
    this.name = null;
    this.description = null;
    for (const step of this.options) {
      step.reset();
    }
  };

  toPayload(): any {
    let options = {};

    for (const group of this.options) {
      for (const option of group.options) {
        options[option.key] = option.value;
      }
    }

    const data = {
      type: this.type,
      name: this.name,
      description: this.description,
      status: null,
      date: new Date(),
      data: {
        datasets: this.datasets,
        options: options
      }
    };

    return data;
  };
}