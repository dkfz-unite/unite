<template>
  <div>
    <pre>{{ submissionTsv }}</pre>
  </div>
</template>

<script>
import Papa from "papaparse";
import { flatten } from "flat";

export default {
  name: 'TsvViewer',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    submissionTsv() {
      if (!this.value) return null;

      const transformKey = function(key) {
        return key.includes("clinical_data") ? key.replace("clinical_data", "") :
               key.includes("molecular_data") ? key.replace("molecular_data", "") :
               key.includes("info") ? key.replace("info", "") :
               key;
      };

      const options = {
        safe: true,
        transformKey: transformKey
      };

      if (Array.isArray(this.value)) {
        const json = this.value.map((item) => flatten(item, options));
        const tsv = Papa.unparse(json, { delimiter: "\t" });
        return tsv;
      } else {
        const json = flatten(this.value, options);
        const tsv = Papa.unparse(json, { delimiter: "\t" });
        return tsv;
      }
    }
  }
};
</script>
