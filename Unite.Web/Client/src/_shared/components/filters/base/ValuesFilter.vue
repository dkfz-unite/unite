<template>
  <q-select
    :label="label"
    :placeholder="placeholder"
    :disable="disable"
    v-model="filterValue"
    @update:modelValue="onUpdate"
    new-value-mode="add-unique"
    multiple clearable use-input use-chips
    square outlined dense options-dense hide-dropdown-icon>
    <template v-slot:prepend>
      <q-icon
        name="las la-minus-circle" size="xs"
        class="q-ma-none q-pa-none cursor-pointer"
        :color="filterExclude ? 'red' : 'null'"
        :disable="isEmpty"
        @click="!isEmpty && onExclude()"
      />
    </template>
  </q-select>
</template>

<script>
export default {
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
    isEmpty() {
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

      if (this.isEmpty) {
        this.filterExclude = false;
      }
    },
    
    onExclude() {
      this.filterExclude = !this.filterExclude;
      this.$emit("update:exclude", this.filterExclude);        
    }
  }
}
</script>