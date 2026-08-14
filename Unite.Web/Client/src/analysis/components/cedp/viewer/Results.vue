<template>
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
import settings from "@/visualization/_shared/settings";
import * as Papa from "papaparse";
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
      samples: null,
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
      this.samples = await this.parseMeta(this.meta.samples);
      this.values = await this.parseData(this.data);

      for (const row of this.values) {
        row.sample = this.samples.find(entry => entry.sample_key == row.sample);
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
        row.sample = parseFloat(row.sample);
        row.condition = row.condition;
        row.value = parseFloat(row.value);
      }

      return values.data;
    },

    getTraces(values) {
      const groups = values.groupBy(row => row.condition);
        
      const traces = Array.from(groups.entries()).map(([group, groupData]) => {
        return {
          title: group,
          name: group,
          type: "box",
          boxpoints: 'all',
          y: groupData.map((row) => row.value),
          text: groupData.map(e => e.condition),
          customdata: groupData.map(e => e.sample),
          hovertemplate:
            "Sample: %{customdata.sample_id}<br>" +
            "Specimen: %{customdata.specimen_id}<br>" +
            "Donor: %{customdata.donor_id}<br>" +
            "Value: %{y:.4f}<br>" +
            "Condition: %{text}" +
            "<extra></extra>"
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
            text: "Condition",
          },
          showline: true,
          zeroline: false
        },
        yaxis: {
          title: {
            text: "Expression",
          },
          showline: true,
          zeroline: false
        }
      };
    },

    onClick(event) {
      // const point = event.points[0];
      // this.$router.push({
      //   name: "donor",
      //   params: {
      //     id: point.customdata.id
      //   }
      // });
    }
  }
}
</script>