import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import AnalysisType from "./analysis-type";
import { OptionsGroup } from "./options";

export default abstract class Analysis {
  name: string;
  description: string;
  datasets: any[];

  abstract type: AnalysisType;
  abstract options: OptionsGroup[];

  constructor(datasets: any[]) {
    this.name = null;
    this.description = null;
    this.datasets = datasets;
  }

  reset(): void {
    this.name = null;
    this.description = null;
    this.resetOptions();
  };

  resetOptions(): void {
    for (const step of this.options) {
      step.reset();
    }
  }

  toPayload(): any {
    const options = {};
    const datasets = [];

    for (const group of this.options) {
      for (const option of group.options) {
        options[option.key] = option.value;
      }
    }

    for (const dataset of this.datasets) {
      datasets.push({
        id: dataset.id,
        name: dataset.name,
        order: dataset.order, 
        domain: dataset.domain,
        criteria: new FiltersCriteria(dataset.criteria).toSearchCriteria() 
      });
    }

    const data = {
      id: null,
      type: this.type,
      name: this.name,
      description: this.description,
      status: null,
      date: new Date(),
      data: {
        options: options,
        datasets: datasets
      }
    };

    return data;
  };
}