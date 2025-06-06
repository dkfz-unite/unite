export default class SubmissionType {
  static values = {
    "DNA SMs": "dna-sm",
    "DNA CNVs": "dna-cnv",
    "DNA SVs": "dna-sv"
  }

  static DNA_SM = this.values["DNA SMs"];
  static DNA_CNV = this.values["DNA CNVs"];
  static DNA_SV = this.values["DNA SVs"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
