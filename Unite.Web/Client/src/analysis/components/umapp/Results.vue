<template>
  <div class="row q-mb-sm">
    <q-select
      v-if="groups?.length"
      v-model="group"
      :options="groups"
      @update:model-value="update"
      label="Group by"
      square outlined dense options-dense
      style="width: 250px;"
    />
  </div>

  <u-plotly
    :id="id"
    :data="traces"
    :layout="layout"
    :config="config"
    @click="onClick"
  />
</template>

<script>
import UPlotly from "@/visualization/_shared/Plotly.vue";
import * as Papa from "papaparse";
import settings from "@/visualization/_shared/settings";
import { colors } from "quasar";

export default {
  components: {
    UPlotly
  },

  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: {
      type: [String, Array, Object, Blob],
      required: true
    },
    meta: {
      type: [String, Array, Object, Blob],
      required: true
    }
  },

  data() {
    return {
      values: null,
      annotations: null,
      groups: null,
      group: null,
      traces: null,
      layout: null,
      config: null
    }
  },

  async mounted() {    
    await this.init();
  },

  watch: {
    async data(value) {      
      await this.init();
    }
  },

  methods: {
    async init() {
      this.annotations = await this.parseMeta(this.meta);
      this.groups = Object.keys(this.annotations[0]).filter(key => !["sample_id", "sample_key", "donor_key", "specimen_key"].includes(key));
      this.group = this.groups[0];
      this.values = await this.parseData(this.data);
      
      for (let i = 0; i < this.values.length; i++) {
        this.values[i].meta = this.annotations[i];
      }

      this.traces = this.getTraces(this.values);
      this.layout = this.getLayout(this.values);
      this.config = { responsive: true };
    },

    async update() {
      this.traces = this.getTraces(this.values);
      this.layout = this.getLayout(this.values);
    },

    async parseMeta(blob) {
      const tsv = await blob.text();
      const values = Papa.parse(tsv.trim(), { header: true, delimiter: "\t" });
      return values.data;
    },

    async parseData(blob) {
      const tsv = await blob.text();
      const values = Papa.parse(tsv.trim(), { header: true, delimiter: "\t" });
      for (const row of values.data) {
        row.V1 = parseFloat(row.V1);
        row.V2 = parseFloat(row.V2);
      }
      return values.data;
    },

    getTraces(values) {
      const groups = values.groupBy(row => row.meta[this.group]);
        
      const traces = Array.from(groups.entries()).map(([group, groupData]) => {
        return {
          title: this.group,
          name: group,
          type: "scatter",
          mode: "markers",
          x: groupData.map((row) => row.V1),
          y: groupData.map((row) => row.V2),
          customdata: groupData.map(row => row.meta),
          hoverinfo: "text",
          hovertext: this.getTooltipData(groupData, this.group),
          marker: {
            size: 8,
            opacity: 1.2,
            color: colors
          }
        };
      });

      return traces;
    },

    getLayout(data) {
      return {
        title: {
          text: this.title,
          x: 0.03,
        },
        modebar: settings.modebar,
        margin: {
          t: 40,
          r: 50,
          b: 40,
          l: 50
        },
        showlegend: true,
        xaxis: {
          title: {
            text: "V1",
          },
          showline: true,
          zeroline: false
        },
        yaxis: {
          title: {
            text: "V2",
          },
          showline: true,
          zeroline: false
        }
      };
    },

    getTooltipData(entries, group) {
      return entries.map(entry => 
        `Donor: ${entry.meta["donor_key"]}<br>` +
        `Specimen: ${entry.meta["specimen_key"]}<br>` +
        `V1: ${Math.roundTo(entry.V1, 4)}<br>` +
        `V2: ${Math.roundTo(entry.V2, 4)}<br>` +
        `${group}: ${entry.meta[group]}`);
    },

    getTooltipStyle(color) {
      return {
        bgcolor: colors.getPaletteColor("white"),
        bordercolor: color,
        font: { color: colors.getPaletteColor("black") }
      };
    },

    onClick(event) {
      // const point = event.points[0];
      // this.$router.push({
      //   name: "gene",
      //   params: {
      //     id: point.customdata.id
      //   }
      // });
    },
  }
}
</script>