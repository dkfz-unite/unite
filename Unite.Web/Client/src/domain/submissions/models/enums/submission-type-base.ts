export abstract class SubmissionTypeBase {
  // Requires subclasses to have: static readonly map: Map<string, string>
  
  static getLabel(this: { map: Map<string, string> }, type: string): string {
    return this.map.get(type) ?? type;
  }

  static includes(this: { map: Map<string, string> }, type: string): boolean {
    return this.map.has(type);
  }
}