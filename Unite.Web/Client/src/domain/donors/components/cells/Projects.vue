<template>
  <u-array v-if="projects" :items="projects" v-slot="{item}">
    <u-link-project :id="item.id">
      {{ item.name }}
    </u-link-project>
  </u-array>
</template>

<script>

export default {
  props: {
    projects: {
      type: [Array, null],
      required: false
    }
  }
}
</script>