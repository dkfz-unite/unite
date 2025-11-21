<template>
  <div class="row q-col-gutter-xs">
    <q-select
      v-model="xModel"
      :options="xOptions"
      label="XAxis"
      class="q-mb-sm"
      outlined dense
    />
    <q-select
      v-model="yModel"
      :options="yOptions"
      label="YAxis"
      outlined dense
    />
    <q-select
      v-model="categoryModel"
      :options="categoryOptions"
      label="Category"
      outlined dense
    />
  </div>
</template>

<script>
export default {
  props: {
    pcs: { type: Array, required: true },
    categories: { type: Array, required: true },
    xAxis: { type: String },
    yAxis: { type: String },
    category: { type: String }
  },

  emits: ["update:xAxis", "update:yAxis", "update:category"],

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

    categoryModel: {
      get() {
        return this.category;
      },
      set(val) {
        this.$emit("update:category", val);
      },
    },

    xOptions() {
      return this.pcs.filter((pc) => pc !== this.yModel);
    },

    yOptions() {
      return this.pcs.filter((pc) => pc !== this.xModel);
    },

    categoryOptions() {
      return this.categories.filter((x) => x !== this.categoryModel);
    },
  },
};
</script>