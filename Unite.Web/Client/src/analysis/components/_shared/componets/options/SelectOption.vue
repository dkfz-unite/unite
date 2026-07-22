<template>
  <!-- Readonly -->
  <div v-if="readonly" class="row items-center q-gutter-xs">
    <div class="text-grey">{{ option.title }}: </div>
    <div>{{ label }}</div>
  </div>
  <!-- Editable -->
  <q-select v-else
    v-model="option.value"
    :options="options"
    :label="option.title"
    :loading="loading"
    :multiple="multiple"
    :use-chips="multiple"
    :use-input="writable"
    :clearable="writable"
    @filter="onFilter"
    @clear="option.options = []"
    @update:model-value="onUpdate"
    emit-value map-options dense options-dense square outlined
  />
</template>

<script>
import { SelectOption, SelectManyOption, SelectMethod } from "../../options";

export default {
  props: {
    option: {
      type: [SelectOption, SelectManyOption],
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  emits: ["request", "update"],

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
    },

    writable() {
      return this.option.lazy == SelectMethod.Filter;
    },

    multiple() {
      return this.option instanceof SelectManyOption;
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

      this.loading = false;
    }
  },

  mounted() {
    if (this.readonly == true)
      return;
    
    if (this.option.lazy == SelectMethod.Once) {
      this.loading = true;
      this.$emit('request', { option: this.option, value: null });
    }
  },

  methods: {
    onFilter(val, update, abort) {
      if (this.option.lazy !== SelectMethod.Filter || val?.length < 3 || val == this.option.value) {
        update();
        abort();
        return;
      }

      this.loading = true;
      this.update = update;
      this.abort = abort;
      this.$emit('request', { option: this.option, value: val });
    },

    onUpdate() {
      this.$emit('update', this.option);
    }
  }
}
</script>