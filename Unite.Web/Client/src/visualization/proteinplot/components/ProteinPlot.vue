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
        <u-color-legend v-if="groups?.length" :title="grouping === 'impact' ? 'Impacts' : 'Consequences'" :items="groups" class="q-mx-sm" />
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from "quasar";
import RandomColors from "../../_shared/random-colors";
import impactsMap from "../../_shared/genome/impacts-map";
import consequencesMap from "../../_shared/genome/consequences-map";
import settings from "../../_shared/settings";
import UPlotly from "../../_shared/Plotly.vue";
import UColorLegend from "../../_shared/genome/ColorLegend.vue";

export default {
  components: {
    UPlotly,
    UColorLegend
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

  watch: {
    grouping() {
      this.groups = this.getGroups();
      this.traces = this.getTraces();
    }
  },

  async mounted() {
    this.groups = this.getGroups();
    this.layout = this.getLayout();
    this.traces = this.getTraces();
    this.config = this.getConfig();
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
      const pointIndex = data.points[0].pointIndex;
      const pointData = data.points[0].data.customdata[pointIndex] || data.points[0].data.customdata;
      
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
      let groups = this.data.mutations.groupBy(m => this.grouping === "impact" ? m.impact : m.consequence);

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
            `Variant: SSM${variant.id}<br>` +
            `AA Change: ${variant.aminoAcidChange}<br>` +
            `Affected Donors: ${variant.y}<br>` +
            `Imact: ${variant.impact}<br>` +
            `Consequence: ${consequencesMap.get(variant.consequence).name}`),
          hoverlabel: {
            bgcolor: colors.getPaletteColor("white"),
            bordercolor: this.getVariantColor(key),
            font: { color: colors.getPaletteColor("black") }
          },
          marker: {
            size: values.map(variant => this.currentVariantId === variant.id || this.hoverVariantId === variant.id ? 12 : 10),
            opacity: 1,
            color: this.getVariantColor(key),
            line: {
              color: colors.getPaletteColor("black"),
              width: values.map(variant => this.currentVariantId === variant.id ? 1 : 0)
            }
          },
        });
      }

      return series;
    },

    getDomainsSeries() {
      if (!this.data.proteins) return [];

      let series = [];
      let groups = this.data.proteins.groupBy(p => p.id);
      let randomColors = new RandomColors();

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
          },
          showlegend: false,
          showtick: false,
        });
      }

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

    getVariantColor(group) {
      return this.grouping === "impact" 
        ? impactsMap.get(group)?.color
        : consequencesMap.get(group)?.color;
    },

    getGroups() {
      return this.grouping === "impact" 
        ? [...this.data.mutations.groupBy(m => m.impact).keys()].map(key => impactsMap.get(key))
        : [...this.data.mutations.groupBy(m => m.consequence).keys()].map(key => consequencesMap.get(key));
    },

    getGroupName(group) {
      return this.grouping === "impact" 
        ? impactsMap.get(group)?.name
        : consequencesMap.get(group)?.name;
    },

    getGroupColor(group) {
      return this.grouping === "impact" 
        ? impactsMap.get(group)?.color
        : consequencesMap.get(group)?.color;
    },
  }
}
</script>