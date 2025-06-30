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
          v-model:value="from"
          v-model:exclude="filterExclude"
          @update:exclude="onExclude"
        />
        <u-number-filter
          v-show="showTo"
          :label="labelTo || 'To'"
          :placeholder="placeholderTo"
          v-model:value="to"
          v-model:exclude="filterExclude"
          @update:exclude="onExclude"
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
      v-model:value="from"
      v-model:exclude="filterExclude"
      @update:exclude="onExclude"
    />
    <u-number-filter
      v-show="showTo"
      :label="labelTo || 'To'"
      :placeholder="placeholderTo"
      v-model:value="to"
      v-model:exclude="filterExclude"
      @update:exclude="onExclude"
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
    value: {
      type: Object,
      default: { from: null, to: null }
    },
    exclude: {
      type: Boolean,
      default: false
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
  
  emits: ["update:value", "update:exclude"],

  data() {
    return {
      filterValue: this.value,
      filterExclude: this.exclude
    }
  },

  computed: {
    from: {
      get() { return this.value?.from },
      set(value) {
        const range = { from: value, to: this.to };
        this.$emit("update:value", range);

        if (!this.hasValue(range)) {
          this.filterExclude = false;
        }
      }
    },

    to: {
      get() { return this.value?.to },
      set(value) {
        const range = { from: this.from, to: value };
        this.$emit("update:value", range);

        if (!this.hasValue(range)) {
          this.filterExclude = false;
        }
      }
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
    onExclude() {
      this.$emit("update:exclude", this.filterExclude);
    },

    hasValue(value) {
      return (value.from != null && value.from != "")
          || (value.to != null && value.to != "");
    }
  }
}
</script>