export default class SubmissionType {
  static values = {
    "MR images": "mr",
    "CT images": "ct",
    "Radiomics features": "img-rad"

  }

  static MR = this.values["MR images"];
  static CT = this.values["CT images"];
  static Radiomics = this.values["Radiomics features"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
