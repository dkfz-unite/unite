<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <div class="col" align="left">
        <q-option-group
          v-model="step"
          :options="options.map((group, index) => ({ label: group.title, value: index }))"
          dense inline
        />
      </div>
    </div>

    <div class="row">
      <div class="col" :style="{ height: height + 'px', overflowY: 'auto' }">
        <q-tab-panels v-model="step" class="q-ma-none q-pa-none">
          <q-tab-panel v-for="(group, index) in options" :key="index" :name="index" class="q-px-none q-py-xs">
            <div class="col" :class="readonly ? 'q-gutter-xs' : 'q-gutter-sm'">
              <template v-for="option in group.options" :key="option.key">
                <div v-if="show(option, group.options)" class="row q-col-gutter-xs">
                  <div class="col">
                    <u-boolean-option v-if="isBooleanOption(option)" :option="option" :readonly="readonly"/>
                    <u-number-option v-else-if="isNumberOption(option)" :option="option" :readonly="readonly" />
                    <u-select-option v-else-if="isSelectOption(option)" :option="option" :readonly="readonly" @request="onRequest" @update="onUpdate" />
                  </div>
                  <div class="col-auto" v-if="option.hint">
                    <q-icon name="las la-question-circle" size="xs" class="cursor-pointer">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 10]" class="bg-grey-3 text-black text-subtitle2">
                        <div v-html="option.hint"></div>
                      </q-tooltip>
                    </q-icon>
                  </div>
                </div>
              </template>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
// Add "readonly" mode for each option component
// Think of adding same "readonly" mechanism to filter components as well
// Options component should be able to:
// 1. Load static list of options from backend
// 2. Autocomplete options from backend

import UBooleanOption from "./options/BooleanOption.vue";
import UNumberOption from "./options/NumberOption.vue";
import USelectOption from "./options/SelectOption.vue";

import { BooleanOption, NumberOption, SelectOption, SelectManyOption } from "../options.js";

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 300
    }
  },

  components: {
    UBooleanOption,
    UNumberOption,
    USelectOption
  },

  emits: ["request", "update"],

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
      return option instanceof SelectOption || option instanceof SelectManyOption;
    },

    show(option, options) {
      const show = !option.show || option.show(options);
      
      if (!show)
        option.value = option.default;

      return show;
    },

    onRequest(params) {
      this.$emit("request", params);
    },

    onUpdate(option) {
      this.$emit("update", option);
    }
  }
}
</script>