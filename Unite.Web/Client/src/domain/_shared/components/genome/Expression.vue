<template>
  <span v-if="expression">
    <span>{{ expression.reads?.toLocaleString() }}</span> / <span class="text-teal">{{ expression.tpm?.toLocaleString() }}</span> / <span class="text-purple">{{ expression.fpkm?.toLocaleString() }}</span>
  </span>
</template>

<script>
export default {
  props: {
    expression: {
      type: Object,
      default: () => null
    }
  }
}
</script>