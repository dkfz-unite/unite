import Criteria from "./models/criteria";
import { sanitiseArray, sanitiseRange, sanitiseThreshold, copy } from "./filter-criteria-helpers";

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

  public abstract clone(): FiltersCriteriaBase;
}