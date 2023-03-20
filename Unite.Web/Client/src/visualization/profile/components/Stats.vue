<template>
  <div v-if="stats?.length" class="row self-center">
    <div class="text-weight-medium"> {{ title }}: </div>
    <div class="row self-center q-ml-xs">
      <template v-for="stat in stats">
        <div :style="{ height: '20px', width: `${stat.number > 0 ? (stat.percent || 1) * 3 : 0}px`, backgroundColor: stat.color }">
          <q-tooltip style="font-size: 12px;">
            {{ stat.text }}: {{ stat.number }} ({{ stat.percent }}%)
          </q-tooltip>
        </div>
      </template>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    title: String,
    stats: Array
  }
}
</script>