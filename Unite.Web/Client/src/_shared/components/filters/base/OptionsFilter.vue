<template>
  <div class="row items-center">
    <u-icon-exclude v-if="!filterEmpty" class="col-auto q-mr-xs" :exclude="filterExclude" :disable="filterEmpty" @click="!filterEmpty && onExclude()" />
    <q-select
      class="col"
      clear-icon="las la-times-circle"
      :label="label"
      :disable="disable || !hasOptions"
      :options="options"
      v-model="filterValue"
      @update:modelValue="onUpdate"
      multiple clearable use-chips emit-value map-options
      square outlined dense options-dense hide-dropdown-icon>
    </q-select>
  </div>
</template>

<script>
import UIconExclude from "./IconExclude.vue";

export default {
  components: {
    UIconExclude
  },

  props: {
    value: {
      type: Array,
      default() {
        return null;
      }
    },
    exclude: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        return null;
      }
    },
    label: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    }
  },

  emits: ["update:value", "update:exclude"],

  data() {
    return {
      filterValue: this.value,
      filterExclude: this.exclude
    }
  },

  computed: {
    filterEmpty() {
      return !this.filterValue?.length;
    },

    hasOptions() {
      return !!this.options?.length;
    },
  },

  watch: {
    value(value) {
      this.filterValue = value;
    },

    exclude(value) {
      this.filterExclude = value;
    }
  },

  methods: {
    onUpdate(value) {
      this.$emit("update:value", value);

      if (this.filterEmpty) {
        this.filterExclude = false;
        this.$emit("update:exclude", this.filterExclude);
      }
    },

    onExclude() {
      this.filterExclude = !this.filterExclude;
      this.$emit("update:exclude", this.filterExclude);
    }
  }
}
</script>