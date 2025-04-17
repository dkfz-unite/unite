<template>
  <div class="col q-gutter-y-xs">
    <!-- Title -->
    <div class="row">
      <span class="text-subtitle1 text-weight-medium">Available data</span>
    </div>
    
    <!-- Data -->
    <div class="row q-gutter-x-md">
      <u-data-group title="Donors" :show="true">
        <u-data-item title="Clinical data" :show="!!data.clinical" />
        <u-data-item title="Treatmens" :show="!!data.treatments" />
      </u-data-group>
      <u-data-group title="Images" :show="!!data.mrs || !!data.cts">
        <u-data-item title="MR" :show="!!data.mrs" />
        <u-data-item title="CT" :show="!!data.cts" />
      </u-data-group>
      <u-data-group title="Materials" :show="!!data.materials">
        <u-data-item title="Molecular data" :show="!!data.materialsMolecular" />
      </u-data-group>
      <u-data-group title="Cell Lines" :show="!!data.lines">
        <u-data-item title="Molecular data" :show="!!data.linesMolecular" />
        <u-data-item title="Interventions" :show="!!data.linesInterventions" />
        <u-data-item title="Drug screenings" :show="!!data.linesDrugs" />
      </u-data-group>
      <u-data-group title="Organoids" :show="!!data.organoids">
        <u-data-item title="Molecular data" :show="!!data.organoidsMolecular" />
        <u-data-item title="Interventions" :show="!!data.organoidsInterventions" />
        <u-data-item title="Drug screenings" :show="!!data.organoidsDrugs" />
      </u-data-group>
      <u-data-group title="Xenografts" :show="!!data.xenografts">
        <u-data-item title="Molecular data" :show="!!data.xenograftsMolecular" />
        <u-data-item title="Interventions" :show="!!data.xenograftsInterventions" />
        <u-data-item title="Drug screenings" :show="!!data.xenograftsDrugs" />
      </u-data-group>
      <u-data-group title="DNA" :show="!!data.sms || !!data.cnvs || !!data.svs || !!data.meth">
        <u-data-item title="SM" :show="!!data.sms" />
        <u-data-item title="CNV" :show="!!data.cnvs" />
        <u-data-item title="SV" :show="!!data.svs" />
        <u-data-item title="METH" :show="!!data.meth" />
      </u-data-group>
      <u-data-group title="RNA" :show="!!data.exp || !!data.expSc">
        <u-data-item title="Bulk Expressions" :show="!!data.exp" />
        <u-data-item title="Single Cell Expressions" :show="!!data.expSc" />
      </u-data-group>
    </div>
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