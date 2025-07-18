<template>
  <div class="row items-center">
    <u-icon-exclude
      v-if="!filterEmpty"
      class="col-auto q-mr-xs"
      :exclude="filterExclude"
      :disable="filterEmpty"
      @click="!filterEmpty && onExclude()">
    </u-icon-exclude>
    <q-select
      class="col"
      clear-icon="las la-times-circle"
      :label="label"
      :placeholder="placeholder"
      :disable="disable"
      v-model="filterValue"
      @update:modelValue="onUpdate"
      new-value-mode="add-unique"
      multiple clearable use-input use-chips
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
    label: {
      type: String,
      default: null
    },
    placeholder: {
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
    }
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