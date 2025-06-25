import Criteria from "./models/criteria";
import { sanitiseArray, sanitiseRange, sanitiseThreshold, copy } from "./filter-criteria-helpers";
import ValuesCriteria from "./models/criteria-values";

export default abstract class FiltersCriteriaBase {
  public get numberOfFilters(): number {
    let number = 0;
    
    for (const prop in this) {
      const value = this[prop];
      if (value instanceof Criteria) {
        number += value?.count || 0;
      }
    }

    return number;
  }

  constructor(criteria: FiltersCriteriaBase | null = null) {
    if (!criteria) return;
  }
  
  public sanitise(): void {

  }
  
  public clear(): void {
    for (const prop in this) {
      const value = this[prop];
      if (value instanceof Criteria) {
        value?.clear();
      }
    }
  }
  
  public copy() {
    return copy(this);
  }

  public toJSON(): any {
    const json: any = {};

    for (const prop in this) {
      const value = this[prop];
       if (value instanceof Criteria && value.count > 0)
        json[prop] = this[prop];
    }

    return json;
  }

  public abstract clone(): FiltersCriteriaBase;
}