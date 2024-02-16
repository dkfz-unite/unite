<template>
  <div class="col q-pt-sm q-gutter-y-sm">
    <!-- Header -->
    <div class="row">
      <u-header :dataset="dataset" />
    </div>
    
    <q-separator v-if="dataset.data" />

    <!-- Data -->
    <div class="row" v-if="dataset.data">
      <u-data :data="dataset.data" />
    </div>

    <q-separator v-if="dataset.criteria" />

    <!-- Criteria -->
    <div class="row" v-if="dataset.criteria">
      <u-criteria :dataset="dataset" />
    </div>
  </div>
</template>

<script>
import UHeader from "./header/Header.vue";
import UData from "./data/Data.vue";
import UCriteria from "./criteria/Criteria.vue";

export default {
  components: {
    UHeader,
    UData,
    UCriteria
  },

  props: {
    dataset: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      default: () => null
    }
  }
}
</script>