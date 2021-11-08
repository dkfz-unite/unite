<template>
  <div class="col q-gutter-y-sm">
    <div v-for="(filter, i) in filters" :key="i">
      <u-criteria-filter
        v-if="showFilter(filter)"
        v-model="filtersCriteria[filter.name]"
        :filter="filter"
        :options="filter.options == null ? null : filter.options(filtersContext)"
        @update:modelValue="onUpdate($event, filter)"
      />
    </div>
  </div>
</template>

<script>
import UCriteriaFilter from "./CriteriaFilter.vue";

export default {
  components: {
    UCriteriaFilter
  },

  props: {
    modelValue: {
      type: Object,
      required: true
    },
    filters: {
      type: Array,
      required: true
    },
    context: {
      type: Object,
      required: false
    }
  },

  emits: ["update:modelValue"],

  data() {
    return {
      filtersCriteria: this.modelValue,
      filtersContext: this.context
    };
  },

  methods: {
    showFilter(filter) {
      if (filter.show != null) {
        return filter.show(this.filtersCriteria[filter.name], this.filtersCriteria, this.filtersContext);
      } else {
        return true;
      }
    },

    onUpdate(event, filter) {
      if (filter.watch != null) {
        filter.watch(event?.target, this.filtersCriteria, this.filtersContext);
      }

      this.$emit("update:modelValue", this.filtersCriteria);
    }
  }
}
</script>