export default class SubmissionType {
  static values = {
    "RNA Expressions": "rna-exp",
    "scRNA - Expressions": "rnasc-exp"
  }

  static RNA_EXP = this.values["RNA Expressions"];
  static RNASC_EXP = this.values["scRNA - Expressions"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
