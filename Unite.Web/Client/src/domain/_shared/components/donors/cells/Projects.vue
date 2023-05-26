<template>
  <u-array v-if="projects" :items="projects" v-slot="{item}">
    <u-project-link :id="item.id">
      {{ item.name }}
    </u-project-link>
  </u-array>
</template>

<script>
import UProjectLink from "@/_shared/components/ProjectLink.vue";

export default {
  components: { UProjectLink },
  
  props: {
    projects: {
      type: [Array, null],
      required: false
    }
  }
}
</script>