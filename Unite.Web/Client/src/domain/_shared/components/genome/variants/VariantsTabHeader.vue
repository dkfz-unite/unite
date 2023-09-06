<template>
  <q-btn flat stretch label="Variants" :disable="disable" :icon="icon" :class="{ 'active': active }" stack>
    <q-menu fit>
      <q-list dense>
        <q-item clickable @click="$emit('update:modelValue', 'ssms')" :active="modelValue == 'ssms'" :disable="disableSsms">
          <q-item-section>
            <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
              <q-icon name="svguse:/icons.svg#u-ssm" size="sm" />
              <span>Mutations (SSM)</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable @click="$emit('update:modelValue', 'cnvs')" :active="modelValue == 'cnvs'" :disable="disableCnvs">
          <q-item-section>
            <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
              <q-icon name="svguse:/icons.svg#u-cnv" size="sm" />
              <span>Copy Number Variants (CNV)</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable @click="$emit('update:modelValue', 'svs')" :active="modelValue == 'svs'" :disable="disableSvs">
          <q-item-section>
            <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
              <q-icon name="svguse:/icons.svg#u-sv" size="sm" />
              <span>Structural Variants (SV)</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    },
    disableSsms: {
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

  computed: {
    tab() {
      return this.modelValue === "ssms" ? "ssms"
           : this.modelValue === "cnvs" ? "cnvs"
           : this.modelValue === "svs" ? "svs"
           : null;
    },
    icon() {
      return this.modelValue === "ssms" ? "svguse:/icons.svg#u-ssm"
           : this.modelValue === "cnvs" ? "svguse:/icons.svg#u-cnv"
           : this.modelValue === "svs" ? "svguse:/icons.svg#u-sv"
           : "svguse:/icons.svg#u-ssm";
    },
    active() {
      return ["ssms", "cnvs", "svs"].includes(this.modelValue);
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