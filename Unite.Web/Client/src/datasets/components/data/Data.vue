<template>
  <div class="row q-gutter-lg">
    <u-data-group title="Donors" :show="true">
      <u-data-item title="Clinical data" :show="!!data.clinical" />
      <u-data-item title="Treatmens" :show="!!data.treatments" />
    </u-data-group>
    <u-data-group title="Images" :show="!!data.mris || !!data.cts">
      <u-data-item title="MRI" :show="!!data.mris" />
      <u-data-item title="CT" :show="!!data.cts" />
    </u-data-group>
    <u-data-group title="Materials" :show="!!data.materials">
      <u-data-item title="Molecular data" :show="!!data.materialsMolecular" />
    </u-data-group>
    <u-data-group title="Cell Lines" :show="!!data.lines">
      <u-data-item title="Molecular data" :show="!!data.linesMolecular" />
      <u-data-item title="Drug screenings" :show="!!data.linesDrugs" />
    </u-data-group>
    <u-data-group title="Organoids" :show="!!data.organoids">
      <u-data-item title="Molecular data" :show="!!data.organoidsMolecular" />
      <u-data-item title="Drug screenings" :show="!!data.organoidsDrugs" />
      <u-data-item title="Interventions" :show="!!data.organoidsInterventions" />
    </u-data-group>
    <u-data-group title="Xenografts" :show="!!data.xenografts">
      <u-data-item title="Molecular data" :show="!!data.xenograftsMolecular" />
      <u-data-item title="Drug screenings" :show="!!data.xenograftsDrugs" />
      <u-data-item title="Interventions" :show="!!data.xenograftsInterventions" />
    </u-data-group>
    <u-data-group title="Variants" :show="!!data.ssms || !!data.cnvs || !!data.svs">
      <u-data-item title="SSM" :show="!!data.ssms" />
      <u-data-item title="CNV" :show="!!data.cnvs" />
      <u-data-item title="SV" :show="!!data.svs" />
    </u-data-group>
    <u-data-group title="Transcriptomics" :show="!!data.geneExp || !!data.geneExpSc">
      <u-data-item title="Bulk" :show="!!data.geneExp" />
      <u-data-item title="Single cell" :show="!!data.geneExpSc" />
    </u-data-group>
  </div>
</template>

<script>
import UDataGroup from "./DataGroup.vue";
import UDataItem from "./DataItem.vue";

export default {
  components: {
    UDataGroup,
    UDataItem
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>