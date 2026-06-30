import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import AnalysisType from "./analysis-type";
import { OptionsGroup, IOption } from "./options";

export default abstract class Analysis {
  abstract type: AnalysisType;
  abstract options: OptionsGroup[];

  id: string = null;
  name: string = null;
  description: string = null;
  datasets: any[] = [];
  status: string = null;
  message: string = null;

  constructor(payload: any = null) {
    this.id = payload?.id ?? null;
    this.name = payload?.name ?? null;
    this.description = payload?.description ?? null;
    this.datasets = payload?.data?.datasets ?? [];
    this.status = payload?.status ?? null;
    this.message = payload?.message ?? null;

    if (payload?.data?.options) {
      for (const key in payload.data.options) {
        const option = this.findOption(key);

        if (option)
          option.value = payload.data.options[key];
      }
    }
  }

  canStart(): boolean {
    return true;
  }

  reset(): void {
    this.name = null;
    this.description = null;
    this.resetOptions();
  }

  resetOptions(): void {
    if (this.options?.length > 0) {
      for (const step of this.options) {
        step.reset();
      }
    }
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

  static canCreate(datasets: any[]): boolean {
    return datasets?.length > 0;
  }
}