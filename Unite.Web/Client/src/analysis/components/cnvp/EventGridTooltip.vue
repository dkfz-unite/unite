<template>
  <q-tooltip
    v-if="target && data"
    class="bg-grey-1 text-grey-10 shadow-5 text-caption"
    anchor="top middle" 
    self="bottom middle" 
    :offset="[10, 10]"
    :target="target">

    <div class="col">
      <div v-for="property in data" class="row content-center q-gutter-xs">
        <div><span class="text-weight-light">{{property.key}}:</span></div>
        <div><span class="text-weight-medium">{{property.value}}</span></div>
      </div>
    </div>
    
  </q-tooltip>
</template>

<script>
export default {
  props: {
    target: {
      type: Element,
      default: null
    },
    data: {
      type: [Array],
      default: null
    }
  }
}
</script>