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
                <div v-if="show(option, group.options)" class="row items-center">
                  <div class="col" :class="{ 'u-checkbox' : !readonly && isBooleanOption(option), 'q-pa-sm': !readonly && isBooleanOption(option) }">
                    <u-boolean-option v-if="isBooleanOption(option)" :option="option" :readonly="readonly" />
                    <u-number-option v-else-if="isNumberOption(option)" :option="option" :readonly="readonly" />
                    <u-select-option v-else-if="isSelectOption(option)" :option="option" :readonly="readonly" @request="onRequest" @update="onUpdate" />
                    <u-file-option v-else-if="isFileOption(option)" :option="option" :readonly="readonly" />
                  </div>
                  <div class="col-auto q-pl-xs" v-if="!readonly && option.hint">
                    <q-icon name="las la-question-circle" size="sm" class="cursor-pointer">
                      <q-tooltip class="bg-white text-black text-body2" style="border: 1px solid black;">
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
import UBooleanOption from "./options/BooleanOption.vue";
import UNumberOption from "./options/NumberOption.vue";
import USelectOption from "./options/SelectOption.vue";
import UFileOption from "./options/FileOption.vue";

import { BooleanOption, NumberOption, SelectOption, SelectManyOption, FileOption } from "../options.js";

export default {
  components: {
    UBooleanOption,
    UNumberOption,
    USelectOption,
    UFileOption
  },

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

    isFileOption(option) {
      return option instanceof FileOption;
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

<style lang="scss" scoped>
@import '@/styles/quasar.variables.scss';

.u-checkbox {
  border: 1px solid $grey-5;
}
</style>