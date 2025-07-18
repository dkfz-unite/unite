<template>
  <div class="column q-pa-sm u-check-box">
    <q-checkbox
      v-model="filterValue"
      :label="label"
      :disable="disable"
      :toggle-indeterminate="nullable"
      @input="onUpdate"
      @update:modelValue="onUpdate"
      dense
    />
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: null
      },
      label: {
        type: String,
        default: null
      },
      disable: {
        type: Boolean,
        default: false
      },
      nullable: {
        type: Boolean,
        default: true
      }
    },

    emits: ["update:value"],

    data() {
      return {
        filterValue: this.value
      }
    },

    computed: {
      isEmpty() {
        return this.filterValue == null;
      }
    },

    watch: {
      value(value) {
        this.filterValue = value;
      }
    },

    methods: {
      onUpdate(value) {
        this.$emit("update:value", value);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/styles/quasar.variables.scss';

.u-check-box {
  border: 1px solid $grey-5;
}
</style>