export class ValueOption<T> {
  value?: T;
  default?: T;

  constructor(options: Partial<ValueOption<T>>) {
    this.value = options.value ?? options.default;
    this.default = options.default;
  }
}

export class ValuesOption {
  value?: string;
  default?: string;
  options?: { label: string; value: string | null }[];

  constructor(options: Partial<ValuesOption>) {
    this.value = options.value ?? options.default;
    this.default = options.default;
    this.options = options.options;
  }
}

export class NumberOption {
  value?: number;
  default?: number;
  min?: number;
  max?: number;

  constructor(options: Partial<NumberOption>) {
    this.value = options.value ?? options.default;
    this.default = options.default;
    this.min = options.min;
    this.max = options.max;
  }
}
