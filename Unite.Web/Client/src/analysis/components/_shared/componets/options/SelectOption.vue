<template>
  <!-- Readonly -->
  <div v-if="readonly" class="row items-center q-gutter-xs">
    <div class="text-grey">{{ option.title }}: </div>
    <div>{{ label }}</div>
  </div>
  <!-- Editable -->
  <q-select
    v-else
    v-model="option.value"
    :options="options"
    :label="option.title"
    :loading="loading"
    @filter="onFilter"
    emit-value map-options dense options-dense square outlined
  />
</template>

<script>
import { SelectOption, SelectMethod } from "../../options";

export default {
  props: {
    option: {
      type: SelectOption,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  emits: ['load'],

  data() {
    return {
      update: null,
      abort: null,
      loading: false
    }
  },

  computed: {
    label() {
      return this.options?.find(option => option.value === this.option.value)?.label || this.option.value;
    },

    options() {
      return this.option.options;
    }
  },

  watch: {
    options(val, old) {
      if (this.update) {
        this.update();
        this.update = null;
      }

      if (this.abort) {
        this.abort();
        this.abort = null;
      }

      if (!old?.length) {
        this.option.value = this.options[0].value;
      }

      this.loading = false;
    }
  },

  mounted() {
    if (this.option.lazy != null) {
      this.loading = true;
      this.$emit('load', { option: this.option, value: null });
    }
  },

  methods: {
    onFilter(val, update, abort) {
      if (this.option.lazy !== SelectMethod.Filter) {
        update();
        abort();
        return;
      }

      this.loading = true;
      this.update = update;
      this.abort = abort;
      this.$emit('load', { option: this.option, value: val });
    }
  }
}
</script>