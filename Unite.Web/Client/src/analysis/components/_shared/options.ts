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

  reset(): void;
}

export abstract class Option<T> implements IOption {
  key: string;
  title: string;
  value: T;
  default: T;

  reset(): void {
    this.value = this.default;
  }

  constructor(key: string, title: string, defaultValue: T = null) {
    this.key = key;
    this.title = title;
    this.default = defaultValue;
    this.value = defaultValue;
  }
}

export class BooleanOption extends Option<boolean> {
}

export class NumberOption extends Option<number> {
  min: number = null;
  max: number = null;
  step: number = null;


  constructor(key: string, title: string, defaultValue: number = null, min: number = null, max: number = null, step: number = null) {
    super(key, title, defaultValue);
    this.min = min;
    this.max = max;
    this.step = step;
  }
}

export class SelectOption<T> extends Option<T> {
  options: SelectValue<T>[] = [];

  override reset(): void {
    const defaultOption = this.options.find(opt => opt.isDefault);

    if (defaultOption) {
      this.value = defaultOption.value;
    } else {
      this.value = null;
    }
  }

  constructor(key: string, title: string, options: SelectValue<T>[] = []) {
    super(key, title, options?.find(opt => opt.isDefault)?.value);
    this.options = options;
  }
}

export class SelectValue<T> {
  label: string;
  value: T;
  isDefault: boolean = false;

  constructor(label: string, value: T, isDefault: boolean = false) {
    this.label = label;
    this.value = value;
    this.isDefault = isDefault;
  }
}