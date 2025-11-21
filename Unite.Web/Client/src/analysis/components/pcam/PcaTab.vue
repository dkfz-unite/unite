<template>
  <q-card>
    <u-filter-items
      :pcs="pcs" 
      :categories="categories"
      v-model:xAxis="selectedX"
      v-model:yAxis="selectedY"
      v-model:category="selectedCategory"
    />
    <q-separator />
  </q-card>

  <q-card>
    <template v-if="!loading">
      <u-plotly
        :id="id"
        :data="traces"
        :layout="layout"
        :config="config"
      />
    </template>
    <template v-else>
      <q-inner-loading :showing="true" label="Please wait..."></q-inner-loading>
    </template>
  </q-card>
</template>

<script>
  import UPlotly from "@/visualization/_shared/Plotly.vue";
  import UFilterItems from "./UserOptions.vue";
  import UScree from "./ScreeTab.vue";
  import settings from "@/visualization/_shared/settings";
  import { colors } from "quasar";
  import * as Papa from "papaparse";

  export default {
    components: {
      UPlotly,
      UFilterItems,
      UScree
    },

    props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      data: {
        type: [Object, Array, Blob],
        required: true,
      },
      meta:{
        type: [Object, Array, Blob],
        required: true,
      }
    },

    data() {
      return {
        loading: false,
        parsedData: [],
        pcs: [],
        categories: [],
        selectedX: "PC1",
        selectedY: "PC2",
        selectedCategory: "sample_id",
        resultsRows: [],
        metadataRows: [],
        traces: [],
        layout: {},
        config: {},
      };
    },

    async mounted() {
      await this.init();
    },

    watch: {
      async data(value) {
        await this.init();
      },

      async selectedX() {
        this.traces = this.getTraces(this.parsedData);
        this.layout = this.getLayout();
      },

      async selectedY() {
        this.traces = this.getTraces(this.parsedData);
        this.layout = this.getLayout();
      },

      async selectedCategory() {
        this.traces = this.getTraces(this.parsedData);
        this.layout = this.getLayout();
      },
    },

    methods: {
      async init() {
        this.parsedData = await this.getParsedData(this.data, this.meta);

        if (this.parsedData.length > 0) {
          this.pcs = Object.keys(this.parsedData[0]).filter(
            (key) => key.startsWith("PC")
          );
          this.categories = Object.keys(this.metadataRows[0]).filter(c => c !== "path");
        }

        this.traces = this.getTraces(this.parsedData);
        this.layout = this.getLayout();
      },  

      async getParsedData(results, metadata) {
        this.loading = true;
        const resultsTsv = await new Response(results).text();
        this.resultsRows = this.toJson(resultsTsv);
        const metadataTsv = await new Response(metadata).text();
        this.metadataRows = this.toJson(metadataTsv);
        const joinedRows = this.joinTables(this.resultsRows,this.metadataRows);
        this.loading = false;
        return joinedRows;
      },

      getTraces(data) {
        const groups = data.groupBy(row => row[this.selectedCategory]);

        const traces = Array.from(groups.entries()).map(([group, groupData]) => {
          return {
            name: group,
            type: "scatter",
            mode: "markers",
            x: groupData.map((row) => row[this.selectedX]),
            y: groupData.map((row) => row[this.selectedY]),
            text: groupData.map((row) => `Sample: ${row.Sample}`),
            marker: {
              size: 8,
              opacity: 1.2,
              color: colors
            }
          };
        });

        return traces;
      },

      getLayout() {
        return {
          title: {
            text: this.title,
            x: 0.03,
          },
          modebar: settings.modebar,
          margin: {
            t: 40,
            r: 50,
            b: 50,
            l: 60,
          },
          xaxis: {
            title: {text : this.selectedX},
            showline: true,
            zeroline: false,
          },
          yaxis: {
            title: {text : this.selectedY},
            showline: true,
            zeroline: false,
          },
        };
      },

      toJson(tsv) {
        const result = Papa.parse(tsv, { delimiter: "\t", header: true, skipEmptyLines: true });
        return result.data; 
      },

      joinTables(results, metadata) {
        const resultsMap = new Map(results.map(row => [row['Sample'], row]));
        const metadataMap = new Map(metadata.map(row => [row['sample_id'], row]));
        const keys = new Set([
          ...results.map(row => row['Sample']),
          ...metadata.map(row => row['sample_id'])
        ]);
        return Array.from(keys).map(key => {
          const mappedResults = resultsMap.get(key) || null;
          const mappedMetadata = metadataMap.get(key) || null ;
            return { ...mappedResults, ...mappedMetadata }
        });
      }
    },
  };
</script>