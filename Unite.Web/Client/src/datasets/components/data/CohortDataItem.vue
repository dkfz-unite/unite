<template>
  <div v-if="show" class="text-caption">{{ title }}</div>
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