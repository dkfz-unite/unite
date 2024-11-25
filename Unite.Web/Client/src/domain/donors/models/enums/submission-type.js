export default class SubmissionType {
  static values = {
    "Donors": "don",
    "Donor Treatments": "don-trt"
  }

  static DON = this.values["Donors"];
  static DON_TRT = this.values["Donor Treatments"];

  static includes(value) {
    return Object.values(this.values).includes(value);
  }
}
