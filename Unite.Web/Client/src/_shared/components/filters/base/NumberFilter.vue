<template>
  <div class="row items-center">
    <u-icon-exclude v-if="!filterEmpty" class="col-auto q-mr-xs" :exclude="filterExclude" :disable="filterEmpty" @click="!filterEmpty && onExclude()" />
    <q-input
      class="col"
      clear-icon="las la-times-circle"
      :label="label"
      :placeholder="placeholder"
      :disable="disable"
      v-model.number="filterValue"
      @update:modelValue="onUpdate"
      type="number"
      debounce="500"
      clearable
      square outlined dense>
    </q-input>
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
      type: Number,
      default: null
    },
    exclude: {
      type: Boolean,
      default: false
    },
    other: {
      type: Number,
      default: null
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
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    default: {
      type: Number,
      default: null
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
      return !this.hasValue(this.filterValue) && !this.hasValue(this.other);
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

  methods:{
    onUpdate(value) {
      if (this.hasValue(value)) {
        if (this.hasValue(this.default)) {
          this.filterValue = this.default;
        }
      };
      
      this.$emit("update:value", this.filterValue);

      if (!this.hasValue(this.filterValue)) {        
        this.filterExclude = false;
        this.$emit("update:exclude", this.filterExclude);
      }
    },

    onExclude() {      
      this.filterExclude = !this.filterExclude;
      this.$emit("update:exclude", this.filterExclude);           
    },

    hasValue(value) {
      return value != null && value != "";
    }
  }
}
</script>