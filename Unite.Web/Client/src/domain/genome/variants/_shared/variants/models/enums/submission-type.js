export default class SubmissionType {
  static values = {
    "DNA SSMs": "dna-ssm",
    "DNA CNVs": "dna-cnv",
    "DNA SVs": "dna-sv"
  }

  static DNA_SSM = this.values["DNA SSMs"];
  static DNA_CNV = this.values["DNA CNVs"];
  static DNA_SV = this.values["DNA SVs"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
