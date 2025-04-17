<template>
  <q-btn label="Variants" :icon="icon" :disable="disable" :class="{ 'active': active }" flat stretch stack>
    <q-menu fit>
      <q-list dense>
        <u-variants-tab-header-item
          :title="Settings.sms.title"
          :icon="Settings.sms.icon"
          :active="modelValue == Settings.sms.domain"
          :disable="disableSms"
          @click="$emit('update:modelValue', Settings.sms.domain)"
          clickable
        />
        <u-variants-tab-header-item
          :title="Settings.cnvs.title"
          :icon="Settings.cnvs.icon"
          :active="modelValue == Settings.cnvs.domain"
          :disable="disableCnvs"
          @click="$emit('update:modelValue', Settings.cnvs.domain)"
          clickable
        />
        <u-variants-tab-header-item
          :title="Settings.svs.title"
          :icon="Settings.svs.icon"
          :active="modelValue == Settings.svs.domain"
          :disable="disableSvs"
          @click="$emit('update:modelValue', Settings.svs.domain)"
          clickable
        />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import UVariantsTabHeaderItem from "./VariantsTabHeaderItem.vue";
import Settings from "@/_settings/settings";

export default {
  components: {
    UVariantsTabHeaderItem
  },

  props: {
    modelValue: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    },
    disableSms: {
      type: Boolean,
      default: false
    },
    disableCnvs: {
      type: Boolean,
      default: false
    },
    disableSvs: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return {
      Settings
    }
  },

  computed: {
    tab() {
      switch (this.modelValue) {
        case Settings.sms.domain: Settings.sms.domain;
        case Settings.cnvs.domain: Settings.cnvs.domain;
        case Settings.svs.domain: Settings.svs.domain;
        default: null;
      }
    },

    icon() {
      switch (this.modelValue) {
        case Settings.sms.domain: return Settings.sms.icon;
        case Settings.cnvs.domain: return Settings.cnvs.icon;
        case Settings.svs.domain: return Settings.svs.icon;
        default: return Settings.sms.icon;
      }
    },

    active() {
      return [Settings.sms.domain, Settings.cnvs.domain, Settings.svs.domain].includes(this.modelValue);
    }
  }
}
</script>

<style scoped lang="scss">
  .q-btn.active {
    border-bottom: 2px solid black;
    padding-bottom: 1px;
  }
</style>