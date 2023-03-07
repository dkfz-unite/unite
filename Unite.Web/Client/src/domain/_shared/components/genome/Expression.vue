<template>
  <span>
    <span>{{ expression.reads }}</span> / <span class="text-teal">{{ expression.tpm }}</span> / <span class="text-purple">{{ expression.fpkm }}</span>
  </span>
</template>

<script>
export default {
  props: {
    expression: {
      type: Object,
      required: true
    }
  }
}
</script>