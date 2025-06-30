<template>
  <q-select
    :label="label"
    :disable="disable || !hasOptions"
    :options="options"
    v-model="filterValue"
    @update:modelValue="onUpdate"
    multiple clearable use-chips emit-value map-options
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
    isEmpty() {
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