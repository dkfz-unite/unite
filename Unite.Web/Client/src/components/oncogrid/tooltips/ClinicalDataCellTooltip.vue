<template>
  <q-tooltip
    content-class="bg-grey-1 text-grey-10 shadow-5 text-caption"
    anchor="top middle" 
    self="bottom middle" 
    :offset="[10, 10]"
    :target="target"
    v-if="target && data">

    <div class="col">
      <div v-for="(property, index) in data" :key="index" class="row content-center q-gutter-xs">
        <div><span class="text-weight-light">{{property.key}}:</span></div>
        <div><span class="text-weight-medium">{{property.value}}</span></div>
      </div>
    </div>
    
  </q-tooltip>
</template>

<script>
export default {
  props: ["target", "data"]
}
</script>