<template>
  <q-btn
    icon="las la-filter"
    :title="title"
    :disable="!options.length"
    class="q-px-none"
    unelevated dense>
    <q-badge
      v-if="!allSelected"
      color="primary"
      class="submission-type-filter-badge"
      rounded floating>
      {{ modelValue.length }}
    </q-badge>

    <q-menu>
      <q-list dense class="submission-type-options">
        <q-item @click="toggleAll" clickable dense>
          <q-item-section>All types</q-item-section>
          <q-item-section side>
            <q-checkbox
              :model-value="allSelected"
              @update:model-value="toggleAll"
              @click.stop
              dense />
          </q-item-section>
        </q-item>

        <q-separator />

        <div class="submission-type-options-scroll">
          <q-item
            v-for="option in options"
            :key="option.value"
            @click="toggle(option.value)"
            clickable dense>
            <q-item-section>{{ option.label }}</q-item-section>
            <q-item-section side>
              <div class="row no-wrap items-center q-gutter-x-sm">
                <span v-if="option.count" class="text-caption text-grey-7">
                  {{ option.count }}
                </span>
                <q-checkbox
                  :model-value="isSelected(option.value)"
                  @update:model-value="toggle(option.value)"
                  @click.stop
                  dense />
              </div>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
const selectionKey = "admin-submission-types";

export default {
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },

  emits: ["update:modelValue"],

  mounted() {
    this.$emit("update:modelValue", this.loadSelection());
  },

  computed: {
    allSelected() {
      return this.modelValue.length == this.options.length;
    },

    title() {
      return this.allSelected
        ? "Types"
        : `Types (${this.modelValue.length}/${this.options.length})`;
    }
  },

  watch: {
    modelValue: {
      deep: true,
      handler(value) {
        this.saveSelection(value);
      }
    }
  },

  methods: {
    loadSelection() {
      const json = localStorage.getItem(selectionKey);
      const values = json
        ? JSON.parse(json)
        : this.options.map(option => option.value);

      return values.filter(value => this.options.some(option => option.value == value));
    },

    saveSelection(value) {
      localStorage.setItem(selectionKey, JSON.stringify(value));
    },

    isSelected(value) {
      return this.modelValue.includes(value);
    },

    toggle(value) {
      const values = this.isSelected(value)
        ? this.modelValue.filter(item => item != value)
        : [...this.modelValue, value];

      this.$emit("update:modelValue", values);
    },

    toggleAll() {
      const values = this.allSelected
        ? []
        : this.options.map(option => option.value);

      this.$emit("update:modelValue", values);
    }
  }
};
</script>

<style lang="scss" scoped>
.submission-type-options {
  min-width: 220px;
}

.submission-type-options-scroll {
  max-height: 320px;
  overflow-y: auto;
}

.submission-type-filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  top: -2px;
  right: -2px;
  min-width: 14px;
  height: 14px;
  padding: 0 3px;
  font-size: 9px;
  line-height: 1;
  text-align: center;
}
</style>
