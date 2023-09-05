<template>
  <div v-if="show" class="col-auto">
    <div class="text-weight-medium">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>