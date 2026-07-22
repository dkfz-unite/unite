import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import AnalysisType from "./analysis-type";
import { OptionsGroup, IOption } from "./options";

type AnalysisConstructor<T extends Analysis> = new (datasets: any[]) => T;

export default abstract class Analysis {
  id: string;
  date: Date;
  status: string;
  name: string;
  description: string;
  datasets: any[];
  abstract type: AnalysisType;
  abstract options: OptionsGroup[];

  constructor(datasets: any[]) {
    this.id = null;
    this.date = new Date();
    this.status = null;
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
  }

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
      id: this.id,
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
  }

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

  clone(to: Analysis): void {
    to.id = this.id;
    to.date = this.date;
    to.status = this.status;
    to.name = this.name;
    to.description = this.description;
    to.datasets = this.datasets;

    if (this.options?.length > 0) {
      for (const step of this.options) {
        for (const option of step.options) {
          const toOption = to.findOption(option.key);
          if (toOption)
            toOption.value = option.value;
        }
      }
    }
  }

  static fromPayload<T extends Analysis>(this: AnalysisConstructor<T>, payload: any): T {
    const analysis = new this([]);

    Analysis.map(payload, analysis);

    return analysis;
  }

  static map(from: any, to: Analysis): void {
    to.id = from.id;
    to.date = new Date(from.date);
    to.status = from.status;
    to.name = from.name;
    to.description = from.description;

    if (from.data?.options) {
      for (const key in from.data.options) {
        const option = to.findOption(key);
        if (option)
          option.value = from.data.options[key];
      }
    }

    if (from.data?.datasets) {
      to.datasets = from.data.datasets;
    }
  }
}