<template>
  <div>
    <div>
      <span>Type: </span>
      <span :class="getColor(tissue)">{{getType(tissue)}}</span>
    </div>
     <div>
      <span>Source: </span>
      <span v-if="!!tissue.source" class="text-black">{{tissue.source}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tissue: {
      type: Object,
      required: true
    }
  },

  methods: {
    getType(tissue) {
      if (tissue.type == "Control") {
        return tissue.type;
      } else if (tissue.type == "Tumor") {
        return tissue.tumorType ?? tissue.type;
      } else {
        return "Unknown";
      }
    },

    getColor(tissue) {
      if (tissue.type == "Control") {
        return "text-green";
      } else if (tissue.tumorType == "Primary") {
        return "text-blue-5";
      } else if (tissue.tumorType == "Metastasis") {
        return "text-blue-7";
      } else if (tissue.tumorType == "Recurrent") {
        return "text-blue-9";
      } else if (tissue.type == "Tumor") {
        return "text-blue-5";
      } else {
        return "text-black";
      }
    }
  }
}
</script>
