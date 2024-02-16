<template>
  <span>
    <q-badge color="grey-2" text-color="black" class="text-body2 text-weight-medium">
      {{ $helpers.content.toBooleanString(value) }}
    </q-badge>
  </span>
</template>

<script>
export default {
  props: {
    filter: Object,
    value: Boolean
  }
}
</script>