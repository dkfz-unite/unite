<template>
  <div class="col" v-if="data">
    <u-mutation-tooltip :target="targetMutation" :data="targetMutationData" />
    <u-protein-domain-tooltip :target="targetProteinDomain" :data="targetProteinDomainData" />

    <div class="row">
      <div class="col-12">
        <div class="q-pa-sm">
          <div id="lolliplot" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3v4";
import Lolliplot from "@oncojs/lolliplot";
import UMutationTooltip from "./tooltips/MutationTooltip.vue";
import UProteinDomainTooltip from "./tooltips/ProteinDomainTooltip.vue";
import consequences from "../_common/consequences.js";

export default {
  props: ["data"],

  data() {
    return {
      lolliplot: this.Lolliplot,
      showStats: true,

      targetMutation: false,
      targetMutationData: null,
      targetProteinDomain: false,
      targetProteinDomainData: null,
    }
  },

  computed: {
    screenWidth() {
      return this.$q.screen.width;
    },
  },

  watch: {
    screenWidth() {
      this.initializePlot();
    },
  },

  async mounted() {
    this.initializePlot();
  },

  methods: {
    initializePlot() {
      d3.select("#lolliplot").html(null);

      let width = d3.select("#lolliplot").node().clientWidth;
      let height = this.$q.screen.height * 0.55;

      let args = {
        d3: d3,
        selector: "#lolliplot",
        width: width < 1000 ? 1000 : width,
        height: height < 300 ? 300 : height,
        hideStats: !this.showStats,
        statsBoxWidth: this.showStats ? 300 : 0,
        data: this.data,
        domainWidth: this.data.transcript.protein.length,
        mutationId: this.data.mutation.id,

        onMutationClick: this.onMutationClick,
        onMutationMouseover: this.onMutationHover,
        onProteinMouseover: this.onProteinDomainHover,

        onInit: function() {
          // Remove minimap label
          d3.selectAll("text")
            .filter(function() {
              let element = d3.select(this);
              let matches = element.attr("class") == "minimap-label";
              return matches;
            })
            .remove();

          // Remove domains hint text
          d3.selectAll("text")
            .filter(function() {
              let element = d3.select(this);
              let matches = element.text().startsWith("This track represents");
              return matches;
            })
            .remove();
        }
      };

      this.lolliplot = new Lolliplot(args);
    },

    resetPlot() {
      this.lolliplot.reset();
    },

    setShowStats(value) {
      this.showStats = value;
      this.initializePlot();
    },

    onMutationClick(data) {
      this.$router.push({ name: "mutation", params: { id: data.id.toString() } });
      this.$router.go(0);
    },

    onMutationHover(data) {
      let element = this.getHoverElement();

      let consequence = consequences.find(consequence => consequence.type == data.consequence);

      let properties = [
        { key: "Mutation", value: data.code },
        { key: "Affected donors", value: data.numberOfDonors },
        { key: "AA change", value: data.aminoAcidChange },
        { key: "Consequence", value: consequence.name },
        { key: "Imapct", value: consequence.impact, color: this.getImpactColor(consequence.impact) }
      ];

      this.targetMutationData = properties;
      this.targetMutation = element;
    },

    onProteinDomainHover(data) {
      let element = this.getHoverElement();

      let properties = [
        { key: "ID", value: data.id }, 
        { key: "Name", value: data.symbol },
        { key: "Description", value: data.description },
        { key: "Start", value: data.start - data.startOffset },
        { key: "End", value: data.end + data.endOffset }
      ];

      this.targetProteinDomainData = properties;
      this.targetProteinDomain = element;
    },    

    getHoverElement() {
      var elements = document.querySelectorAll(":hover");
      var element = elements[elements.length - 1];
      return element;
    },

    getImpactColor(impact) {
      switch (impact) {
        case "High":
          return "red";
        case "Moderate":
          return "orange";
        case "Low":
          return "green";
        default:
          return "grey";
      }
    },
  },

  components: {
    UMutationTooltip: UMutationTooltip,
    UProteinDomainTooltip: UProteinDomainTooltip,
  },
};
</script>

<style lang="scss">
  .chart-zoom-area {
    stroke: none;
    stroke-width: 0px;
  }

  circle[class^='mutation-circle']:hover {
    cursor: pointer;
  }


</style>