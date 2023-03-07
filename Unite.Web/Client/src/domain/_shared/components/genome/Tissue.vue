<template>
  <div>
    <q-icon class="q-mr-xs" name="svguse:/icons.svg#u-tissue" size="xs" title="Tissue" />
    <router-link class="u-link" :to="{ name: 'tissue', params: { id: specimen.id }}">
      {{specimen.tissue.referenceId}}
    </router-link>
    <q-badge 
      v-if="!!specimen.tissue.type"
      :title="getTissueBadgeTitle(specimen.tissue)"
      :color="getTissueBadgeColor(specimen.tissue)"
      align="top" class="q-ml-xs cursor-pointer" rounded>
      {{ getTissueBadgeLable(specimen.tissue) }}
    </q-badge>
    <slot>
      <!-- Content -->
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    specimen: {
      type: Object,
      required: true
    }
  },

  methods: {
    getTissueBadgeTitle(tissue) {
      if (tissue.type == "Control") {
        return "Control";
      } else if (tissue.tumorType == "Primary") {
        return "Primary";
      } else if (tissue.tumorType == "Metastasis") {
        return "Metastasis";
      } else if (tissue.tumorType == "Recurrent") {
        return "Recurrent";
      } else if (tissue.type == "Tumor") {
        return "Tumor";
      } else {
        return null;
      }
    },

    getTissueBadgeLable(tissue) {
      if (tissue.type == "Control") {
        return "C";
      } else if (tissue.tumorType == "Primary") {
        return "P";
      } else if (tissue.tumorType == "Metastasis") {
        return "M";
      } else if (tissue.tumorType == "Recurrent") {
        return "R";
      } else if (tissue.type == "Tumor") {
        return "T";
      } else {
        return null;
      }
    },

    getTissueBadgeColor(tissue) {
      if (tissue.type == "Control") {
        return "green";
      } else if (tissue.tumorType == "Primary") {
        return "blue-5";
      } else if (tissue.tumorType == "Metastasis") {
        return "blue-7";
      } else if (tissue.tumorType == "Recurrent") {
        return "blue-9";
      } else if (tissue.type == "Tumor") {
        return "blue-5";
      } else {
        return null;
      }
    }
  }
}
</script>