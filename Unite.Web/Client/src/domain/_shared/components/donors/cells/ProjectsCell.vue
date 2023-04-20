<template>
  <q-td :props="props">
    <u-array :items="props.value" v-slot="{item}">
      <u-project-link :id="item.id">
        {{ item.name }}
      </u-project-link>
    </u-array>
  </q-td>
</template>

<script>
import UProjectLink from "../ProjectLink.vue";
export default {
  components: { UProjectLink },
  props: ["props"]
}
</script>