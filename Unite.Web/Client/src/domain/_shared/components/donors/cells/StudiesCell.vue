<template>
  <q-td :props="props">
    <div v-if="props.value?.length">
      <div v-for="(study, i) in props.value" :key="i">
        {{ study.name }}
      </div>
    </div>
  </q-td>
</template>

<script>
export default {
  props: ["props"]
}
</script>