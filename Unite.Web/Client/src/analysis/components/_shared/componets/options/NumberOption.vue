<template>
  <!-- Readonly -->
  <div v-if="readonly" class="row items-center q-gutter-xs">
    <div class="text-grey">{{ option.title }}: </div>
    <div>{{ option.value }}</div>
  </div>
  <!-- Editable -->
  <q-input
    v-else
    v-model="option.value"
    :label="option.title"
    type="number" :min="option.min" :max="option.max" :step="option.step"
    dense square outlined
  />
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>