<template>
  <div class="col q-gutter-y-sm">
    <template v-for="(filter, i) in filters" :key="i">
      <!-- Filters group -->
      <template v-if="filter.group">
        <q-expansion-item
          :label="filter.label"
          :model-value="filter.expand != null ? filter.expand : true"
          dense dense-toggle>
          <div class="col q-pt-xs q-gutter-y-sm">
            <template v-for="(groupFilter, j) in filter.filters" :key="j">
              <u-criteria-filter
                v-if="showFilter(groupFilter)"
                v-model="filtersCriteria[groupFilter.field]"
                :filter="groupFilter"
                :options="groupFilter.options == null ? null : groupFilter.options(filtersContext)"
                @update:modelValue="onUpdate($event, groupFilter)"
              />
            </template>
          </div>
        </q-expansion-item>
      </template>

      <!-- Single filter -->
      <template v-else>
        <u-criteria-filter
          v-if="showFilter(filter)"
          v-model="filtersCriteria[filter.field]"
          :filter="filter"
          :options="filter.options == null ? null : filter.options(filtersContext)"
          @update:modelValue="onUpdate($event, filter)"
        />
      </template>
    </template>
  </div>
</template>

<script>
import UCriteriaFilter from "./CriteriaFilter.vue";

export default {
  components: {
    UCriteriaFilter
  },

  props: {
    criteria: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: false
    },
    filters: {
      type: Array,
      required: true
    }
  },

  emits: ["update"],

  data() {
    return {
      filtersCriteria: this.criteria,
      filtersContext: this.context
    };
  },

  watch: {
    criteria(value) {
      this.filtersCriteria = value;
    },

    context: {
      deep: true,
      handler(value) {
        this.filtersContext = value;
      }
    }
  },

  methods: {
    getField(criteria, field) {
      return criteria[field];
    },

    showFilter(filter) {
      if (filter.show != null) {
        return filter.show(this.filtersCriteria[filter.field], this.filtersCriteria, this.filtersContext);
      } else {
        return true;
      }
    },

    onUpdate(event, filter) {
      if (filter.watch != null) {
        filter.watch(event?.target, this.filtersCriteria, this.filtersContext);
      }
      
      this.$emit("update", this.filtersCriteria);
    }
  }
}
</script>