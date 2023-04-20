<template>
  <div v-if="items?.length" class="row items-center">
    <!-- Prefix -->
    <div v-if="prefix">{{ prefix }}</div>

    <!-- Item -->
    <div class="row items-center" :class="`q-gutter-${spacing}`">
      <div v-for="(item, i) in items">
        <slot :item="item">
          {{ item }}     
        </slot>
        <div v-if="i < items.length - 1">{{ separator }}</div>
      </div>
    </div>

    <!-- Suffix -->
    <div v-if="suffix">{{ suffix }}</div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => null
    },
    separator: {
      type: String,
      default: ','
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    spacing: {
      type: String,
      default: "xs"
    }
  }
}
</script>