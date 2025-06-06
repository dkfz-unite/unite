export default class SubmissionType {
  static values = {
    "RNA Expressions": "rna-exp",
    "scRNA - Expressions": "rnasc-exp",
    "Methylation": "meth",
    "Methylation Level": "meth-lvl",

  }

  static RNA_EXP = this.values["RNA Expressions"];
  static RNASC_EXP = this.values["scRNA - Expressions"];
  static METH = this.values["Methylation"];
  static METH_LVL = this.values["Methylation Level"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
