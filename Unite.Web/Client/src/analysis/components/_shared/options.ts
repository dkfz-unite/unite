import OptionType from "./option-type";

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

export interface IOption {
  key: string;
  title: string;
  value: any;
  default: any;
  show: (options: IOption[]) => boolean;

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

  constructor(key: string, title: string, defaultValue: T = null, show: (options: IOption[]) => boolean = null) {
    this.key = key;
    this.title = title;
    this.default = defaultValue;
    this.value = defaultValue;
    this.show = show;
  }
}

export class BooleanOption extends Option<boolean> {
}

export class NumberOption extends Option<number> {
  min: number = null;
  max: number = null;
  step: number = null;


  constructor(key: string, title: string, defaultValue: number = null, min: number = null, max: number = null, step: number = null, show: (options: IOption[]) => boolean = null) {
    super(key, title, defaultValue, show);
    this.min = min;
    this.max = max;
    this.step = step;
  }
}

export class SelectOption extends Option<string> {
  options: SelectValue[] = [];
  lazy: SelectMethod = null;

  override reset(): void {
    const defaultOption = this.options.find(opt => opt.isDefault);

    if (defaultOption) {
      this.value = defaultOption.value;
    } else {
      this.value = null;
    }
  }

  constructor(key: string, title: string, options: SelectValue[] = [], lazy: SelectMethod = null, show: (options: IOption[]) => boolean = null) {
    super(key, title, options?.find(opt => opt.isDefault)?.value, show);
    this.options = options;
    this.lazy = lazy;
  }
}

export class SelectValue {
  label: string;
  value: string;
  isDefault: boolean = false;

  constructor(label: string, value: string, isDefault: boolean = false) {
    this.label = label;
    this.value = value;
    this.isDefault = isDefault;
  }
}

export enum SelectMethod {
  Filter = "filter",
  Once = "once"
}