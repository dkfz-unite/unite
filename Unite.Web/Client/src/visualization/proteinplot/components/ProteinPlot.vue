<template>
  <div class="col">
    <div class="row">
      <div class="col">
        <q-card class="q-ma-xs">
          <u-plotly
            :data="traces" 
            :layout="layout" 
            :config="config"
            @hover="onHover"
            @unhover="onUnhover"
            @click="onClick" 
          />
        </q-card>
      </div>
      <div v-if="stats" class="col-2">
        <q-card v-if="grouping" class="q-ma-xs q-px-sm">
          <q-card-section class="q-py-sm">
            <div class="text-h6"> {{ this.grouping === "impact" ? "Impacts" : "Consequences" }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <template v-if="groups?.length">
              <div v-for="group in groups" class="row items-center q-gutter-x-sm">
                <div style="width: 10px; height: 10px;" :style="{ backgroundColor: getGroupColor(group) }"></div>
                <div>{{ getGroupName(group) }}</div>
              </div>
            </template>
            <template v-else>
              <div class="text-body">No mutations affecting protein.</div>
            </template>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from "quasar";
import randomColors from "../../_shared/random-colors";
import impactsMap from "../../_shared/impacts-map";
import consequencesMap from "../../_shared/consequences-map";
import settings from "../../_shared/settings";
import UPlotly from "../../_shared/Plotly.vue";

export default {
  components: {
    UPlotly
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    stats: {
      type: Boolean,
      default: true
    },
    grouping: {
      type: String,
      default: "impact",
      validator: value => ["impact", "consequence"].includes(value)
    }
  },

  setup() {
    return {
      tracks: {
        ssm: "ssm",
        pfam: "pfam"
      }
    }
  },

  data() {
    return {
      groups: null,
      groupsToHide: null,
      maxX: this.data.transcript.protein.length,
      maxY: Math.max(...this.data.mutations.map(m => m.y)) + 1,

      currentVariantId: this.data?.mutation?.ssm?.id,
      hoverVariantId: null,
      currentDomainId: null,
      hoverDomainId: null,

      traces: null,
      layout: null,
      config: null
    };
  },

  async mounted() {
    this.layout = this.getLayout();
    this.traces = this.getTraces();
    this.config = this.getConfig();
    this.groups = this.getGroupKeys();
  },

  async updated() {
    this.layout = this.getLayout();
    this.traces = this.getTraces();
    this.config = this.getConfig();
    this.groups = this.getGroupKeys();
  },

  methods: {
    onHover(data) {
      if (!data?.points?.length) return;
      const pointIndex = data.points[0].pointIndex;
      const pointData = data.points[0].data.customdata[pointIndex] || data.points[0].data.customdata;

      if (pointData?.track === this.tracks.ssm) {
        this.hoverVariantId = pointData?.id;
      } else if (pointData?.track === this.tracks.pfam) {
        this.hoverDomainId = pointData?.id;
      }

      this.traces = this.getTraces();
    },

    onUnhover(data) {
      this.hoverVariantId = null;
      this.hoverDomainId = null;

      this.traces = this.getTraces();
    },

    onClick(data) {
      if (!data?.points?.length) return;
      const pointData = data.points[0].data.customdata;
      
      if (pointData?.track === this.tracks.ssm) {
        if (pointData.id === this.currentVariantId) return;
        window.location.href = `/ssms/SSM${pointData?.id}/protein`;
      } else if (pointData?.track === this.tracks.pfam) {
        this.currentDomainId = pointData?.id;
      }

      this.traces = this.getTraces();
    },

    getLayout() {
      return {
        title: `${this.data.transcript.symbol} (${this.data.transcript.protein.length} aa)`,
        modebar: settings.modebar,
        xaxis1: this.getVariantsScale(),
        yaxis1: this.getFrequenciesScale(),
        yaxis2: this.getDomainsScale(),
        shapes: this.getFrequenciesShapes(),
        barmode: "overlay",
        grid: {
          rows: 2,
          columns: 1
        },
      }
    },

    getVariantsScale() {
      return {
        title: "Mutations",
        type: "linear",
        anchor: "x1",
        range: [1, this.maxX],
        showline: true,
        showgrid: false,
        mirror: true,
        fixedrange: false
      }
    },

    getFrequenciesScale() {
      return {
        title: "#Affected Donors",
        type: "linear",
        anchor: "y1",
        range: [0, this.maxY],
        domain: [0.2, 1],
        showline: true,
        showgrid: false,
        mirror: true,
        fixedrange: true,
        dtick: this.data.mutations.length > 100 ? 10 :
               this.data.mutations.length > 10 ? 5 : 1
      };
    },

    getDomainsScale() {
      return {
        title: "Pfam",
        type: "category",
        anchor: "y2",
        domain: [0, 0.2],
        showline: true,
        showgrid: false,
        mirror: true,
        showticklabels: false,
        fixedrange: true
      }
    },

    getFrequenciesShapes() {
      return this.data.mutations.map(variant => ({
        type: "line",
        layer: "below",
        xref: "x1",
        yref: "y1",
        x0: variant.x,
        y0: 0,
        x1: variant.x,
        y1: variant.y,
        line: {
          color: colors.getPaletteColor("grey"),
          opacity: 0.5,
          width: 1,
        }
      }));
    },

    getTraces() {
      let traces = [];

      traces.push(...this.getVariantsSeries());
      traces.push(...this.getDomainsSeries());

      return traces;
    },

    getVariantsSeries() {
      if (!this.grouping) return [];
      let series = [];
      let groups = this.groupBy(this.data.mutations, m => this.grouping === "impact" ? m.impact : m.consequence);

      for (const [key, values] of groups) {
        series.push({
          name: this.getGroupName(key),
          type: "scatter",
          mode: "markers",
          showlegend: false,
          xaxis: "x1",
          yaxis: "y1",
          x: values.map(variant => variant.x),
          y: values.map(variant => variant.y),
          customdata: values.map(variant => ({track: this.tracks.ssm, id: variant.id})),
          meta: values.map(variant => ({ variant: variant, consequence: consequencesMap.get(variant.consequence).name })),
          hoverinfo: "text",
          hovertext: values.map(variant => 
            // `AA: ${variant.x}<br>` +
            `Variant: SSM${variant.id}<br>` +
            `AA Change: ${variant.aminoAcidChange}<br>` +
            `Affected Donors: ${variant.y}<br>` +
            `Imact: ${variant.impact}<br>` +
            `Consequence: ${consequencesMap.get(variant.consequence).name}`),
          hoverlabel: {
            bgcolor: colors.getPaletteColor("white"),
            bordercolor: this.getVariantColor1(key),
            font: { color: colors.getPaletteColor("black") }
          },
          marker: {
            size: values.map(variant => this.currentVariantId === variant.id || this.hoverVariantId === variant.id ? 12 : 10),
            opacity: 1,
            color: this.getVariantColor1(key),
            line: {
              color: colors.getPaletteColor("black"),
              width: values.map(variant => this.currentVariantId === variant.id ? 1 : 0)
            }
          },
        });
      }

      // this.data.mutations.forEach(variant => {
      //   const consequence = consequencesMap.get(variant.consequence).name;
      //   series.push({
      //     name: this.getVariantName(variant),
      //     customdata: { track: this.tracks.ssm, id: variant.id },
      //     xaxis: "x1",
      //     yaxis: "y1",
      //     x: [variant.x, variant.x],
      //     y: [0, variant.y],
      //     hovertemplate: [
      //       `AA: ${variant.x}<extra></extra>`, 
      //       `Variant: SSM${variant.id}<br>` +
      //       `AA Change: ${variant.aminoAcidChange}<br>` +
      //       `Affected Donors: ${variant.y}<br>` +
      //       `Imact: ${variant.impact}<br>` +
      //       `Consequence: ${consequence}` +
      //       "<extra></extra>"],
      //     hoverlabel: {
      //       bgcolor: colors.getPaletteColor("white"),
      //       bordercolor: this.getVariantColor(variant),
      //       font: { color: colors.getPaletteColor("black") }
      //     },
      //     marker: {
      //       size: this.currentVariantId === variant.id || this.hoverVariantId === variant.id ? 12 : 10,
      //       color: this.getVariantColor(variant),
      //       opacity: [0, 1],
      //       line: {
      //         color: colors.getPaletteColor("black"),
      //         width: this.currentVariantId === variant.id ? 1 : 0
      //       }
      //     },
      //     line: {
      //       color: colors.getPaletteColor("grey"),
      //       width: 1
      //     },
      //     showlegend: false
      //   });
      // });

      return series;
    },

    getDomainsSeries() {
      if (!this.data.proteins) return [];

      let series = [];
      let groups = this.groupBy(this.data.proteins, p => p.id);

      for (const [key, values] of groups) {
        let domainColor = randomColors.next();

        series.push({
          name: key,
          type: "bar",
          xaxis: "x1",
          yaxis: "y2",
          orientation: "h",
          base: values.map(domain => domain.start),
          width: 1,
          x: values.map(domain => domain.end - domain.start),
          y: values.map(domain => "Pfam"),
          customdata: values.map(domain => ({track: this.tracks.pfam, id: domain.id})),
          hoverinfo: "text",
          hovertext: values.map(domain => 
            `Domain: ${domain.id}<br>` + 
            `Location: ${domain.start} - ${domain.end}<br>`),
          hoverlabel: {
            bgcolor: colors.getPaletteColor("white"),
            bordercolor: domainColor,
            font: { color: colors.getPaletteColor("black") }
          },
          marker: {
            color: domainColor,
            opacity: values.map(domain => this.currentDomainId === domain.id || this.hoverDomainId === domain.id ? 0.5 : 0.3),
            // opacity: values.map(domain => this.currentDomainId === domain.id || this.hoverDomainId === domain.id ? 0.5 : 0.3),
          },
          showlegend: false,
          showtick: false,
        });
      }


      // let map = new Map();

      // this.data.proteins.forEach(domain => {
      //   let color = map.get(domain.id);
      //   if (!color) {
      //     color = randomColors.next();
      //     map.set(domain.id, color);
      //   }
      //   series.push({
      //     name: domain.id,
      //     customdata: { track: this.tracks.pfam, id: domain.id },
      //     type: "bar",
      //     xaxis: "x1",
      //     yaxis: "y2",
      //     orientation: "h",
      //     base: [domain.start],
      //     width: 1,
      //     x: [domain.end - domain.start],
      //     y: ["Pfam"],
      //     hovertemplate:
      //       `Domain: ${domain.id}<br>` + 
      //       `Location: ${domain.start} - ${domain.end}<br>` +
      //       `<extra></extra>`,
      //     hoverlabel: {
      //       bgcolor: colors.getPaletteColor("white"),
      //       bordercolor: color,
      //       font: { color: colors.getPaletteColor("black") }
      //     },
      //     marker: {
      //       color: color,
      //       opacity: this.hoverDomainId === domain.id ? 0.5 : 0.3,
      //     },
      //     showlegend: false,
      //     showtick: false,
      //   });
      // });

      randomColors.reset();
      return series;
    },

    getConfig() {
      return {
        displayModeBar: true,
        displaylogo: false,
        responsive: true,
      }
    },

    getVariantName(variant) {
      return this.grouping === "impact" 
        ? impactsMap.get(variant.impact).name
        : consequencesMap.get(variant.consequence).name;
    },

    getVariantColor(variant) {
      return this.grouping === "impact" 
        ? impactsMap.get(variant.impact).color
        : consequencesMap.get(variant.consequence).color;
    },

    getVariantColor1(group) {
      return this.grouping === "impact" 
        ? impactsMap.get(group)?.color
        : consequencesMap.get(group)?.color;
    },

    getGroupKeys() {
      return this.grouping === "impact" 
        ? Array.from(this.groupBy(this.data.mutations, m => m.impact).keys()) 
        : Array.from(this.groupBy(this.data.mutations, m => m.consequence).keys());
    },

    getGroupColor(group) {
      return this.grouping === "impact" 
        ? impactsMap.get(group)?.color
        : consequencesMap.get(group)?.color;
    },

    getGroupName(group) {
      return this.grouping === "impact" 
        ? impactsMap.get(group)?.name
        : consequencesMap.get(group)?.name;
    },

    groupBy(items, property = (item) => item) {
      const map = new Map();
      items.forEach((item) => {
        const key = property(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
      });
      return map;
    },
  }
}
</script>