<template>
   <div class="row q-gutter-lg">
    <u-cohort-data-group title="Donors" :show="true">
      <u-cohort-data-item title="Clinical data" :show="!!data.clinical" />
      <u-cohort-data-item title="Treatmens" :show="!!data.treatments" />
    </u-cohort-data-group>
    <u-cohort-data-group title="Images" :show="!!data.mris || !!data.cts">
      <u-cohort-data-item title="MRI" :show="!!data.mris" />
      <u-cohort-data-item title="CT" :show="!!data.cts" />
    </u-cohort-data-group>
    <u-cohort-data-group title="Tissues" :show="!!data.tissues">
      <u-cohort-data-item title="Molecular data" :show="!!data.tissuesMolecular" />
    </u-cohort-data-group>
    <u-cohort-data-group title="Cells" :show="!!data.cells">
      <u-cohort-data-item title="Molecular data" :show="!!data.cellsMolecular" />
      <u-cohort-data-item title="Drug screenings" :show="!!data.cellsDrugs" />
    </u-cohort-data-group>
    <u-cohort-data-group title="Organoids" :show="!!data.organoids">
      <u-cohort-data-item title="Molecular data" :show="!!data.organoidsMolecular" />
      <u-cohort-data-item title="Drug screenings" :show="!!data.organoidsDrugs" />
      <u-cohort-data-item title="Interventions" :show="!!data.organoidsInterventions" />
    </u-cohort-data-group>
    <u-cohort-data-group title="Xenografts" :show="!!data.xenografts">
      <u-cohort-data-item title="Molecular data" :show="!!data.xenograftsMolecular" />
      <u-cohort-data-item title="Drug screenings" :show="!!data.xenograftsDrugs" />
      <u-cohort-data-item title="Interventions" :show="!!data.xenograftsInterventions" />
    </u-cohort-data-group>
    <u-cohort-data-group title="Variants" :show="!!data.ssms || !!data.cnvs || !!data.svs">
      <u-cohort-data-item title="SSM" :show="!!data.ssms" />
      <u-cohort-data-item title="CNV" :show="!!data.cnvs" />
      <u-cohort-data-item title="SV" :show="!!data.svs" />
    </u-cohort-data-group>
    <u-cohort-data-group title="Transcriptomics" :show="!!data.geneExp || !!geneExpSc">
      <u-cohort-data-item title="Bulk" :show="!!data.geneExp" />
      <u-cohort-data-item title="Single cell" :show="!!data.geneExpSc" />
    </u-cohort-data-group>
  </div>
</template>

<script>
import UCohortDataGroup from "./CohortDataGroup.vue";
import UCohortDataItem from "./CohortDataItem.vue";

export default {
  components: {
    UCohortDataGroup,
    UCohortDataItem
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>