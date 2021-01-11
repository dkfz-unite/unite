<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-blue-7 text-white">
      <q-toolbar>
        <q-btn to="/" class="text-bold" flat stretch>DKFZ.UNITE</q-btn>
        <q-tabs dense stretch class="q-pa-none">
          <q-route-tab label="Donors" to="/donors" class="q-pa-none" icon="las la-user-circle" />
          <q-route-tab label="Mutations" to="/mutations" class="q-pa-none" icon="las la-dna" />
          <q-route-tab label="Cells" to="/cells" class="q-pa-none" icon="las la-microscope" disable title="Comming soon"/>
          <q-route-tab label="Radiology" to="/radiology" class="q-pa-none" icon="las la-x-ray" disable title="Comming soon"/>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer class="bg-grey-3 text-white">
      <q-toolbar>
      </q-toolbar>
    </q-footer> -->

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
