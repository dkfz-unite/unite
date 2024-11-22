<template>
  <q-table
    v-if="rows"
    :rows="rows"
    :columns="columns"
    :pagination="{ rowsPerPage: 20 }"
    row-key="id"
    separator="cell"
    class="sticky-header q-ma-xs">
  </q-table>
</template>

<script>
import { flatten } from "flat";

export default {
  props: {
    json: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      rows: null,
      columns: null
    };
  },

  mounted() {
    var flatJson = Array.isArray(this.json)
      ? this.json.map(row => flatten(row))
      : flatten(this.json);

    // let flatJson = flatten(this.json);
    console.log(flatJson);
    
    
    if (Array.isArray(this.json)) {
      this.columns = Object.keys(flatJson[0]).map(key => ({
        name: key,
        label: key,
        align: "center",
        field: key
      }));
    } else {
      this.columns = Object.keys(flatJson).map(key => ({
        name: key,
        label: key,
        align: "center",
        field: key
      }));
    }

    this.rows = [...flatJson];

    console.log(this.columns);
    console.log(this.rows);
    
  },

  // methods: {
  //   flattenNodes(obj, parentKey = "", result = {}) {
  //     for (const [key, value] of Object.entries(obj)) {
  //       const newKey = parentKey ? `${parentKey}.${key}` : key;
  //       if (typeof value === "object" && value !== null && !Array.isArray(value)) {
  //         this.flattenNodes(value, newKey, result);
  //       } else {
  //         result[newKey] = value;
  //       }
  //     }
  //     return result;
  //   }
  // }
}
</script>