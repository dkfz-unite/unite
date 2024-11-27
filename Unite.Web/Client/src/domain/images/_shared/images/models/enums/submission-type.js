export default class SubmissionType {
  static values = {
    "MR images": "mri",
    "CT images": "ct",
    "Radiomics images": "img-rad"

  }

  static MRI = this.values["MR images"];
  static CT = this.values["CT images"];
  static Radiomics = this.values["Radiomics images"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
