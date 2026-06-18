import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import AnalysisType from "./analysis-type";
import { OptionsGroup, IOption } from "./options";

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

  canSubmit(): boolean {
    return true;
  }

  reset(): void {
    this.name = null;
    this.description = null;
    this.resetOptions();
  };

  findOption(key: string): IOption {
    if (this.options?.length > 0) {
      for (const step of this.options) {
        const option = step.options.find(o => o.key === key);
        if (option)
          return option;
      }
    }

    return null;
  }

  resetOptions(): void {
    if (this.options?.length > 0) {
      for (const step of this.options) {
        step.reset();
      }
    }
  }

  toPayload(): any {
    const data = {
      id: null,
      type: this.type,
      name: this.name,
      description: this.description,
      status: null,
      date: new Date(),
      data: {
        options: this.convertOptions(),
        datasets: this.convertDatasets()
      }
    };

    return data;
  };

  convertOptions(): any {
    const options = {};

    if (this.options?.length > 0) {
      for (const group of this.options) {
        for (const option of group.options) {
          options[option.key] = option.value;
        }
      }
    }

    return options;
  }

  convertDatasets(): any[] {
    const datasets = [];

    for (const dataset of this.datasets) {
      datasets.push({
        id: dataset.id,
        name: dataset.name,
        order: dataset.order, 
        domain: dataset.domain,
        criteria: new FiltersCriteria(dataset.criteria).toSearchCriteria() 
      });
    }

    return datasets;
  }
}