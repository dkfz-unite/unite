export default class SubmissionType {
  static donorValues = {
    "Donors": "DON",
    "Donor Treatments": "DON_TRT"
  }

  static imageValues = {
    "MR images": "MRI",
    "CT images": "CT"
  }

  static specimenValues = {
    "Materials": "MAT",
    "Lines": "LNE",
    "Organoids": "ORG",
    "Xenografts": "XEN",
    "Specimen Interventions": "SPE_INT",
    "Specimen Drugs": "SPE_DRG"
  }

  static genomeValues = {
    "DNA SSMs": "DNA_SSM",
    "DNA CNVs": "DNA_CNV",
    "DNA SVs": "DNA_SV",
    "RNA Expressions": "RNA_EXP",
    "scRNA - Expressions": "RNASC_EXP"
  }

  static values = {
    ...this.donorValues,
    ...this.imageValues,
    ...this.specimenValues,
    ...this.genomeValues
  };
}
