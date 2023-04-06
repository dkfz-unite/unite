<template>
  <router-link class="u-link" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true
    }
  }
}
</script>