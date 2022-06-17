<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Admin" />
        <q-breadcrumbs-el label="Roles" />
      </q-breadcrumbs>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>