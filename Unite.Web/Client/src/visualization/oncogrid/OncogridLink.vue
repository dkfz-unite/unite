<template>
  <q-btn
    label="Oncogrid" 
    icon="las la-th" 
    color="black"
    dense flat no-caps
    :to="{ name: 'oncogrid', params: { mode: this.mode }}"
    :disable="disable">
  </q-btn>
</template>

<script>
const modes = ['donors', 'genes'];

export default {
  props: {
    mode: {
      type: String,
      required: true,
      validator(value) {
        return modes.includes(value);
      }
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
}
</script>