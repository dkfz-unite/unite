<template>
  <q-tooltip
    content-class="bg-grey-1 text-grey-10 shadow-5 text-caption"
    anchor="top middle" 
    self="bottom middle" 
    :offset="[10, 10]"
    :target="target"
    v-if="show && target">

    <div class="col">
      <!-- Age -->
      <div class="row content-center q-gutter-xs">
        <div><span class="text-weight-light">Age:</span></div>
        <div><span class="text-weight-medium">Younger</span></div>
        <div class="row content-center">
          <div class="row content-center q-gutter-x-xs">
            <div class="u-palette-box bg-purple-2"></div>
            <div class="u-palette-box bg-purple-5"></div>
            <div class="u-palette-box bg-purple-10"></div>
          </div>
        </div>
        <div><span class="text-weight-medium">Older</span></div>
      </div>

      <!-- Vital status -->
      <div class="row justify-left content-center q-gutter-xs">
        <div><span class="text-weight-light">Vital status:</span></div>
        <div class="row content-center">
          <div class="u-palette-box bg-green-5"></div>
        </div>
        <div><span class="text-weight-medium">Living</span></div>
        <div class="row content-center">
          <div class="u-palette-box bg-red-5"></div>
        </div>
        <div><span class="text-weight-medium">Deceased</span></div>
      </div>

      <!-- Gender -->
      <div class="row justify-left content-center q-gutter-xs">
        <div><span class="text-weight-light">Gender:</span></div>
        <div class="row content-center">
          <div class="u-palette-box bg-orange-5"></div>
        </div>
        <div><span class="text-weight-medium">Female</span></div>
        <div class="row content-center">
          <div class="u-palette-box bg-blue-5"></div>
        </div>
        <div><span class="text-weight-medium">Male</span></div>
      </div>
    </div>

  </q-tooltip>
</template>

<script>
export default {
  props: ["target", "show"],

  computed: {
    tooltipTarget() {
      return this.target;
    }
  }
}
</script>

<style lang="scss" scoped>
.u-palette-box{
  width: 15px;
  height: 15px;
}
</style>