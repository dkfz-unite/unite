<template>
  <!-- Expandable -->
  <template v-if="expandable">
    <q-expansion-item
      :label="label"
      :model-value="true"
      :disable="disable"
      dense dense-toggle>
      <div class="col q-pt-xs q-gutter-y-sm">
        <u-number-filter
          v-show="showFrom"
          :label="labelFrom || 'From'"
          :placeholder="placeholderFrom"
          v-model="from"
        />
        <u-number-filter
          v-show="showTo"
          :label="labelTo || 'To'"
          :placeholder="placeholderTo"
          v-model="to"
        />
      </div>
    </q-expansion-item>
  </template>

  <!-- Solid -->
  <template v-else>
    <u-number-filter
      v-show="showFrom"
      :label="labelFrom || 'From'"
      :placeholder="placeholderFrom"
      v-model="from"
    />
    <u-number-filter
      v-show="showTo"
      :label="labelTo || 'To'"
      :placeholder="placeholderTo"
      v-model="to"
    />
  </template>
</template>

<script>
import UNumberFilter from "./NumberFilter.vue";

export default {
  components: {
    UNumberFilter
  },

  props: {
    modelValue: {
      type: Object,
      default: { from: null, to: null }
    },
    label: {
      type: String,
      default: null
    },
    labelFrom: {
      type: String,
      default: null
    },
    labelTo: {
      type: String,
      default: null
    },
    placeholderFrom: {
      type: String,
      default: null
    },
    placeholderTo: {
      type: String,
      default: null
    },
    showFrom: {
      type: Boolean,
      default: true
    },
    showTo: {
      type: Boolean,
      default: true
    },
    expandable: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ["update:modelValue"],

  computed: {
    from: {
      get() { return this.modelValue?.from },
      set(value) {
        const range = { from: value, to: this.to };
        this.$emit("update:modelValue", range);
      }
    },

    to: {
      get() { return this.modelValue?.to },
      set(value) {
        const range = { from: this.from, to: value };
        this.$emit("update:modelValue", range);
      }
    }
  }
}
</script>