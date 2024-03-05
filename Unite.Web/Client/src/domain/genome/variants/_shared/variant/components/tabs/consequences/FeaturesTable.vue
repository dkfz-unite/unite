<template>
    <div>
      <q-table
        :title="title"
        class="sticky-header-slim"
        separator="cell" dense flat bordered
        row-key="id"
        :columns="columns"
        :rows="rows"
        :pagination="pagination">
  
        <template v-slot:body-cell-gene="props">
          <q-td :props="props">
            <u-link :to="{ name: 'gene', params: { id: props.value.id }}">{{ props.value.symbol }}</u-link>
          </q-td>
        </template>
  
        <template v-slot:body-cell-feature="props">
          <q-td :props="props">
            <div class="row">
              <u-link-external :to="getFeatureId(props.value)">{{ getFeatureName(props.value) }}</u-link-external>
              <div v-if="getIsCanonical(props.value)" title="Canonical" style="cursor:default ; padding-left: 2px; font-size: 8px;">C</div>
            </div>
          </q-td>
        </template>
  
        <template v-slot:body-cell-consequences="props">
          <q-td :props="props">
            <div v-for="(consequence, i) in props.value" :key="i">
              <span :class="getImpactColor(consequence.impact)">{{ getConsequenceName(consequence.type) }}</span>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
  
  <script>
  import ConsequenceType from "@/domain/genome/variants/_shared/variants/models/enums/consequence-type";
  import ImpactColor from "@/domain/genome/variants/_models/impact-color";
  
  export default {
    props: {
      title: {
        type: String,
        required: false,
        default: "Affected Features"
      },
      features: {
        type: Array,
        retuired: true,
        default: () => null
      }
    },
  
    data() {
      return {
        pagination: {
          rowsPerPage: 20
        },
  
        columns: [
          {
            name: "gene",
            label: "Gene",
            field: (row) => row.gene,
            align: "left"
          },
          {
            name: "feature",
            label: "Transcript",
            field: (row) => row,
            align: "left"
          },
          // {
          //   name: "type",
          //   label: "Type",
          //   field: (row) => this.getFeatureType(row),
          //   align: "left"
          // },
          {
            name: "location",
            label: "Location",
            field: (row) => this.getLocation(row),
            align: "left"
          },
          {
            name: "strand",
            label: "Strand",
            field: (row) => this.getStrand(row),
            align: "left"
          },
          {
            name: "consequences",
            label: "Consequences",
            field: (row) => row.consequences,
            align: "left"
          },
          {
            name: "overlapLength",
            label: "Overlap Length",
            field: (row) => this.getOverlapLength(row)?.toLocaleString()
          },
          {
            name: "overlapPercentage",
            label: "Overlap Percentage",
            field: (row) => this.getOverlapPercentage(row)?.toLocaleString()
          },
          {
            name: "distance",
            label: "Distance",
            field: (row) => this.getDistance(row)?.toLocaleString()
          },
        ]
      }
    },
  
    computed: {
      rows() {
        return this.features?.sort((a, b) => {
          var baseA = a.transcript?.feature || a.Regulation?.feature || a.motif?.feature || null;
          var baseB = b.transcript?.feature || b.Regulation?.feature || b.motif?.feature || null;
          return baseA.start - baseB.start;
        });
      }
    },
  
    methods: {
      getLocation(feature) {
        let base = feature.transcript?.feature
                 || feature.regulator?.feature
                 || feature.motif?.feature
                 || null;
        
        if (!base)
          return null;
  
        return `chr${base.chromosome}:${base.start}-${base.end}`;
      },
  
      getStrand(feature) {
        let base = feature.transcript?.feature
                 || feature.regulator?.feature
                 || feature.motif?.feature
                 || null;
        
        if (!base)
          return null;
        
        return this.$helpers.content.toBooleanString(base.strand, false, "+", "-");
      },

      getIsCanonical(feature) {
        return feature.transcript?.feature.isCanonical ||
               feature.regulator?.feature.isCanonical ||
               feature.motif?.feature.isCanonical;
      },
  
      getFeatureType(feature) {
        return !!feature.transcript ? "Transcript" :
               !!feature.regulator ? "Regulator" :
               !!feature.motif ? "Motif" :
               null;
      },
  
      getFeatureName(feature) {
        return !!feature.transcript ? feature.transcript.feature.symbol :
               !!feature.regulator ? feature.regulator.feature.symbol :
               !!feature.motif ? feature.motif.feature.symbol :
               null;
      },
  
      getFeatureId(feature) {
        var ensemblUrl = "http://feb2014.archive.ensembl.org/Homo_sapiens/Transcript/Summary?db=core;t=";
        return !!feature.transcript ? ensemblUrl + feature.transcript.feature.stableId :
               !!feature.regulator ? ensemblUrl + feature.regulator.feature.stableId :
               !!feature.motif ? ensemblUrl + feature.motif.feature.stableId :
               null;
      },
  
      getOverlapLength(feature) {
        return feature.transcript?.overlapBpNumber
            || feature.regulator?.overlapBpNumber
            || feature.motif?.overlapBpNumber
            || null;
      },
  
      getOverlapPercentage(feature) {
        return feature.transcript?.overlapPercentage
            || feature.regulator?.overlapPercentage
            || feature.motif?.overlapPercentage
            || null;
      },
  
      getDistance(feature) {
        return feature.transcript?.distance
            || feature.regulator?.distance
            || feature.motif?.distance
            || null;
      },
  
      getImpactColor(impact) {
        // return ImpactColor.Text[impact];
        switch(impact){
          case "High": return "text-red-8";
          case "Moderate": return "text-orange-8";
          case "Low": return "text-green-8";
          default: return "text-grey-8";
        }
      },
  
      getConsequenceName(value){
        return this.$helpers.enum.getLabel(value, ConsequenceType.values);
      }
    }
  }
  </script>