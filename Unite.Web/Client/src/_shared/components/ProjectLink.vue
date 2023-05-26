<template>
  <u-link :to="{ name: 'project', params: { id: id.toString() } }">
    <slot>
      {{ id }}
    </slot>
  </u-link>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  }
}
</script>