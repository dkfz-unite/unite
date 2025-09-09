<template>
  <div class="row q-col-gutter-xs">
    <q-select
      v-model="xModel"
      :options="xOptions"
      label="XAxis"
      outlined
      dense
      class="q-mb-sm"
    />
    <q-select
      v-model="yModel"
      :options="yOptions"
      label="YAxis"
      outlined
      dense
    />
    <q-select
      v-model="colorModel"
      :options="colorOptions"
      label="Coloring"
      outlined
      dense
    />
  </div>
</template>

<script>
export default {
  props: {
    pcs: { type: Array, required: true },
    xAxis: String,
    yAxis: String,
    category: { type: Array, required: true },
    categoryValue: String
  },
  emits: ["update:xAxis", "update:yAxis", "update:categoryValue"],
  computed: {
    xModel: {
      get() {
        return this.xAxis;
      },
      set(val) {
        this.$emit("update:xAxis", val);
      },
    },

    yModel: {
      get() {
        return this.yAxis;
      },
      set(val) {
        this.$emit("update:yAxis", val);
      },
    },

    colorModel: {
      get() {
        return this.categoryValue;
      },
      set(val) {
        this.$emit("update:categoryValue", val);
      },
    },

    xOptions() {
      return this.pcs.filter((pc) => pc !== this.yModel);
    },

    yOptions() {
      return this.pcs.filter((pc) => pc !== this.xModel);
    },

    colorOptions() {
      return this.category.filter((x) => x !== this.colorModel);
    },
  },
};
</script>