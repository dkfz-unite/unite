<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-blue-7 text-white">
      <q-toolbar>
        <q-btn to="/" class="text-bold" flat stretch>DKFZ.UNITE</q-btn>
        <q-btn to="/privacy" class="text-bold" flat stretch>PRIVACY</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-3 text-white">
      <q-toolbar>
      </q-toolbar>
    </q-footer>

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
