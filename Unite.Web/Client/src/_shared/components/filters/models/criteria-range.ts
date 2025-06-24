import Criteria from "./criteria";

export default class RangeCriteria extends Criteria<Range> {
  public get value(): Range {
    return this._value;
  }
  public set value(value: Range) {
    this._value = value;
  }
  public get not(): boolean {
    return this._not;
  }
  public set not(value: boolean) {
    this._not = value;
  }
  public get count(): number {
    return (this.value?.from !== null || this.value?.to !== null) ? 1 : 0;
  }

  constructor(from: number | null = null, to: number | null = null) {
    super();
    this._value = new Range(from, to);
    this._not = false;
  }

  public override clear(): void {
    this._value = new Range();
    this._not = false;
  }
}

export class Range {
  public from: number | null;
  public to: number | null;

  constructor(from: number | null = null, to: number | null = null) {
    this.from = from;
    this.to = to;
  }
}