<template>
  <!-- Readonly -->
  <div v-if="readonly" class="row items-center q-gutter-xs">
    <div class="text-grey">{{ option.title }}: </div>
    <div>{{ option.value ? "Yes" : "No" }}</div>
  </div>
  <!-- Editable -->
  <q-checkbox
    v-else
    v-model="option.value"
    :label="option.title"
    dense square outlined
  />
</template>

<script>
import { BooleanOption } from '../../options';

export default {
  props: {
    option: {
      type: BooleanOption,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>