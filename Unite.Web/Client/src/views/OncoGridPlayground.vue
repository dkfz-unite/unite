<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }"/>
        <q-breadcrumbs-el label="OncoGridPlayground"/>
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-9 col-md-10">
            <oncogrid/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Oncogrid from "@/components/oncogrid/OncoGrid";
export default {
  components: {Oncogrid}
}
</script>

<style scoped>

</style>