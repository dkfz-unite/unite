<template>
  <div>
    <div>
      <span>Creation Day: </span>
      <span v-if="specimen.creationDay" class="text-black">{{ specimen.creationDay }}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Type: </span>
      <span :class="getColor(specimen)">{{ getType(specimen) }}</span>
    </div>
    <div>
      <span>Source: </span>
      <span v-if="!!specimen.source" class="text-black">{{ specimen.source }}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
  </div>
</template>

<script>
import CategoryType from "@/domain/specimens/_shared/specimens/models/enums/category-type";
import TumorType from "@/domain/specimens/_shared/specimens/models/enums/tumor-type";

export default {
  props: {
    specimen: {
      type: Object,
      required: true
    }
  },

  methods: {
    getType(specimen) {     
      if (specimen.category === CategoryType.Normal) {
        return specimen.category;
      } else if (specimen.category === CategoryType.Tumor) {
        return specimen.tumorType ?? specimen.category;
      } else {
        return "Unknown";
      }
    },

    getColor(specimen) {
      if (specimen.category === CategoryType.Normal) {
        return "text-green";
      } else if (specimen.tumorType === TumorType.Primary) {
        return "text-blue-5";
      } else if (specimen.tumorType === TumorType.Metastasis) {
        return "text-blue-7";
      } else if (specimen.tumorType === TumorType.Recurrent) {
        return "text-blue-9";
      } else if (specimen.category === CategoryType.Tumor) {
        return "text-blue-5";
      } else {
        return "text-black";
      }
    }
  }
}
</script>
