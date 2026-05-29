<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-subtitle text-grey">Options</span>
    </div>

    <div class="row">
      <div class="col">
        <q-option-group
          v-model="step" :options="options.map((group, index) => ({ label: group.title, value: index }))" dense inline />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-tab-panels v-model="step" class="q-ma-none q-pa-none">
          <q-tab-panel v-for="(group, index) in options" :key="index" :name="index" class="q-px-none q-py-xs">
            <div class="col q-gutter-sm">
              <div v-for="option in group.options" :key="option.key" class="row">
                <div class="col">
                  <u-boolean-option v-if="isBooleanOption(option)" :option="option" />
                  <u-number-option v-else-if="isNumberOption(option)" :option="option" />
                  <u-select-option v-else-if="isSelectOption(option)" :option="option" />
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Extract section title to dialog component, so that options view can be reused outside
// Add "readonly" mode for each option component
// Think of adding same "readonly" mechanism to filter components as well
// Options component should be able to:
// 1. Load static list of options from backend
// 2. Autocomplete options from backend

import UBooleanOption from "./options/BooleanOption.vue";
import UNumberOption from "./options/NumberOption.vue";
import USelectOption from "./options/SelectOption.vue";

import { BooleanOption, NumberOption, SelectOption } from "../options.js";

export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },

  components: {
    UBooleanOption,
    UNumberOption,
    USelectOption
  },

  emits: ["request"],

  data() {
    return {
      step: 0
    };
  },

  methods: {
    isBooleanOption(option) {
      return option instanceof BooleanOption;
    },

    isNumberOption(option) {
      return option instanceof NumberOption;
    },

    isSelectOption(option) {
      return option instanceof SelectOption;
    }
  }
}
</script>