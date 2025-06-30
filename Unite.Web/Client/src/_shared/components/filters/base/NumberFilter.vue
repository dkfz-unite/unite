<template>
  <q-input 
    :label="label"
    :placeholder="placeholder"
    :disable="disable"
    v-model.number="filterValue"
    @update:modelValue="onUpdate"
    type="number"
    debounce="500"
    clearable
    square outlined dense>
    <template v-slot:prepend>
      <q-icon
        title="Exclude"
        name="las la-minus-circle" size="xs"
        class="q-ma-none q-pa-none cursor-pointer"
        :color="filterExclude ? 'red' : 'null'"
        :disable="isEmpty"
        @click="!isEmpty && onExclude()"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null
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
    isEmpty() {
      return !this.hasValue(this.filterValue);
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