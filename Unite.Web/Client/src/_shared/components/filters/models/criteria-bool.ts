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
    return this.value !== null ? 1 : 0;
  }

  constructor(value: BoolCriteria | null = null)
  {
    super();
    this._value = value?.value ?? null; 
    this._not = value?.not || false;
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