<template>
  <q-toolbar-title>
    <template v-if="$q.screen.lt.md">
      UNITE
    </template>

    <template v-else>
      <q-btn :to="{ name: 'home' }" dense flat>
        <img src="/logo-white.png" width="250" />
      </q-btn>
    </template>
  </q-toolbar-title>
</template>