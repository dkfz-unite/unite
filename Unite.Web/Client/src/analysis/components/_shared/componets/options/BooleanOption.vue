<template>
  <q-checkbox
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
    }
  }
}
</script>