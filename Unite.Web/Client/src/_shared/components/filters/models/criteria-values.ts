import Criteria from "./criteria";

export default class ValuesCriteria<T> extends Criteria<T[]> {
  public get value(): T[] | null {
    return this._value;
  }
  public set value(value: T[] | null) {
    this._value = value;
  }
  public get not(): boolean {
    return this._not;
  }
  public set not(value: boolean) {
    this._not = value;
  }
  public get count(): number {
    return this.value?.length || 0;
  }

  constructor(criteria: ValuesCriteria<T> | null = null) {
    super();
    this._value = criteria?.value ? [...criteria.value] : [];
    this._not = criteria?.not || false;
  }

  public override clear(): void {
    this._value = new Array<T>();
    this._not = false;
  }

  public toJSON(): any {
    if (!this.value?.length)
      return null;

    const json: any = {
      value: this.value
    };

    if (this.not)
      json.not = this.not;

    return json;
  }
}