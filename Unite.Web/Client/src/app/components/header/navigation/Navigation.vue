<template>
  <q-tabs
    align="left" 
    dense 
    shrink 
    stretch 
    inline-label>
    
    <q-route-tab
      label="Donors"
      icon="las la-user-circle"
      :to="{ name: 'donors' }"
    />

    <q-route-tab 
      label="Tissues"
      icon="svguse:/icons.svg#u-tissue" 
      :to="{ name: 'tissues' }"
    />

    <q-route-tab 
      label="Cell Lines"
      icon="las la-microscope"
      :to="{ name: 'cells' }"
    />

    <q-route-tab 
      label="Organoids"
      icon="svguse:/icons.svg#u-organoid"
      :to="{ name: 'organoids' }"
    />

    <q-route-tab
      label="Xenografts"
      icon="svguse:/icons.svg#u-mouse"
      :to="{ name: 'xenografts' }"
    />

    <q-route-tab
      label="Genes"
      icon="svguse:/icons.svg#u-gene-alt"
      :to="{ name: 'genes' }"
    />

    <q-route-tab
      label="Mutations"
      icon="svguse:/icons.svg#u-mutation-alt"
      :to="{ name: 'mutations' }"
    />
  </q-tabs>
</template>