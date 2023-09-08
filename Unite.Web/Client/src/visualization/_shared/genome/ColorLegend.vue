<template>
  <div class="col">
    <div v-if="title" class="text-h6 q-mb-xs"> {{ title }}</div>
    <q-separator v-if="title" class="q-mb-sm" />
    <div v-for="item in items" class="row items-center q-gutter-x-sm">
      <div style="width: 15px; height: 15px;" :style="{ backgroundColor: item.color }"></div>
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>