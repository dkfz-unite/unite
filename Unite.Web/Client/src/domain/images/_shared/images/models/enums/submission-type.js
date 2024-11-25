export default class SubmissionType {
  static values = {
    "MR images": "mri",
    "CT images": "ct"
  }

  static MRI = this.values["MR images"];
  static CT = this.values["CT images"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
