export class OptionsGroup {
  title: string;
  options: IOption[];

  constructor(title: string, options: IOption[]) {
    this.title = title;
    this.options = options;
  }

  reset(): void {
    for (const option of this.options) {
      option.reset();
    }
  }
}

export interface IOptionParams {
  key: string;
  title: string;
  default?: any;
  show?: (options: IOption[]) => boolean;
}

export interface IOption extends IOptionParams {
  value: any;

  reset(): void;
}

export abstract class Option<T> implements IOption {
  key: string;
  title: string;
  value: T;
  default: T;
  show: (options: IOption[]) => boolean = null;

  reset(): void {
    this.value = this.default;
  }

  constructor(params: IOptionParams) {
    this.key = params.key;
    this.title = params.title;
    this.default = params.default;
    this.value = params.default;
    this.show = params.show;
  }
}

export class BooleanOption extends Option<boolean> {
}

export interface UNumberOptionParams extends IOptionParams {
  min?: number;
  max?: number;
  step?: number;
}

export class NumberOption extends Option<number> implements UNumberOptionParams{
  min: number = null;
  max: number = null;
  step: number = null;

  constructor(params: UNumberOptionParams) {
    super(params);
    this.min = params.min;
    this.max = params.max;
    this.step = params.step;
  }
}

export interface ISelectOptionParams extends IOptionParams {
  options?: SelectValue[];
  lazy?: SelectMethod;
}

export class SelectOption extends Option<string> implements ISelectOptionParams {
  options: SelectValue[] = [];
  lazy: SelectMethod = null;

  constructor(params: ISelectOptionParams) {
    super(params);
    this.options = params.options || [];
    this.lazy = params.lazy || null;
  }
}

export class SelectValue {
  label: string;
  value: string;
  isDefault: boolean = false;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}

export enum SelectMethod {
  Filter = "filter",
  Once = "once"
}