export default abstract class Criteria<T> {
  protected _value: T;
  protected _not: boolean;

  public abstract get value(): T;
  public abstract set value(value: T);
  public abstract get not(): boolean;
  public abstract set not(value: boolean);
  public abstract get count(): number;

  public abstract clear(): void;
}