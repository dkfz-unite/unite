<template>
  <q-tooltip
    class="bg-grey-1 text-grey-10 shadow-5 text-caption"
    :target="target"
    v-if="data">

    <div class="col">
      <div v-for="(property, index) in data" :key="index" class="row content-center q-gutter-xs">
        <div>
          <span class="text-weight-light">
            {{property.key}}:
          </span>
        </div>
        <div>
          <span class="text-weight-medium" :style="{ color: property.color}">
            {{property.value}}
          </span>
        </div>
      </div>
    </div>

  </q-tooltip>
</template>

<script>
export default {
  props: ["target", "data"],
}
</script>