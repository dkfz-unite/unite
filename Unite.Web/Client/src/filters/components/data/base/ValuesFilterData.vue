<template>
  <span v-for="(value, i) in values" :key="i">
    <span v-if="i != 0">, </span>
    <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">
      {{value}}
    </q-badge>
  </span>
</template>

<script>
export default {
  props: {
    filter: Object,
    values: Array
  }
}
</script>