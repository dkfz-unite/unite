<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-subtitle text-grey">Datasets</span>
    </div>

    <template v-for="(dataset, index) in datasetsOrdered" :key="index">
      <div class="row items-center q-gutter-xs q-mb-xs">
        <q-icon :name="Settings[dataset.domain]?.icon" size="sm" />
        <div>{{ dataset.name }}</div>
      </div>
      <template v-if="comparing && index < datasetsOrdered.length - 1">
        <div class="row text-hint text-grey-7 q-mb-xs">vs</div>
      </template>
    </template>
  </div>
</template>

<script>
import Settings from "@/_settings/settings";

export default {
  props: {
    datasets: {
      type: Array,
      required: true
    },
    comparing: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return {
      Settings
    }
  },

  computed: {
    datasetsOrdered() {
      return this.datasets.sort((a, b) => a.order - b.order);
    }
  }
}
</script>