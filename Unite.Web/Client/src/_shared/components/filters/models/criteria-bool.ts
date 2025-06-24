import Criteria from "./criteria";

export default class BoolCriteria extends Criteria<boolean> {
  public get value(): boolean {
    return this._value;
  }
  public set value(value: boolean) {
    this._value = value;
  }
  public get not(): boolean {
    return this._not;
  }
  public set not(value: boolean) {
    this._not = value;
  }
  public get count(): number {
    return this.value ? 1 : 0;
  }

  constructor(value: boolean | null = null)
  {
    super();
    this._value = value;
    this._not = false;
  }

  public override clear(): void {
    this._value = null;
    this._not = false;
  }
}