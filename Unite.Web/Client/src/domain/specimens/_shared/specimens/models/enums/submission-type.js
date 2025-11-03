export default class SubmissionType {
  static values = {
    "Materials": "mat",
    "Lines": "lne",
    "Organoids": "org",
    "Xenografts": "xen",
    "Specimen Interventions": "spe-int",
    "Specimen Drugs": "spe-drg"
  }

  static MAT = this.values["Materials"];
  static LNE = this.values["Lines"];
  static ORG = this.values["Organoids"];
  static XEN = this.values["Xenografts"];
  static SPE_INT = this.values["Specimen Interventions"];
  static SPE_DRG = this.values["Specimen Drugs Screening"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
