import Criteria from "./criteria";

export default class NumberCriteria extends Criteria<number> {
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    this._value = value;
  }
  public get not(): boolean {
    return this._not;
  }
  public set not(value: boolean) {
    this._not = value;
  }
  public get count(): number {
    return this.value !== null ? 1 : 0;
  }

  constructor(criteria: NumberCriteria | null = null, value: number | null = null, not: boolean = false)
  {
    super();
    this._value = criteria?.value ?? value ?? null; 
    this._not = criteria?.not ?? not ?? false;
  }

  public override clear(): void {
    this._value = null;
    this._not = false;
  }

  public toJSON(): any {
    if (this.value === null)
      return null;
    
    const json: any = {
      value: this.value
    };

    if (this.not)
      json.not = this.not;

    return json;
  }
}