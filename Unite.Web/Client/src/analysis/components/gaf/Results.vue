<template>
  <u-event-grid v-if="meta" :id="id" :data="meta">
    <template #header>
      <div class="row items-center q-gutter-sm">
        <span class="text-subtitle2">Color scheme:</span>
        <q-btn-toggle
            v-model="grouping.value"
            :options="grouping.options"
            @update:model-value="init"
            dense no-caps
          />
      </div>
    </template>
  </u-event-grid>
</template>

<script>
import UEventGrid from "./EventGrid.vue";
import effectsMapEffect from "@/visualization/_shared/genome/effects-map-effect.js";
import effectsMapImpact from "@/visualization/_shared/genome/effects-map-impact.js";

const effectsColorMap = Object.fromEntries(Array.from(effectsMapEffect.entries()).map(([key, val]) => [key, val.color]));
const impactsColorMap = Object.fromEntries(Array.from(effectsMapImpact.entries()).map(([key, val]) => [key, val.color]));

export default {
  components: {
    UEventGrid
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
    }
  },

  data() {
    return {
      meta: null,
      grouping: {
        value: "effect",
        options: [
          { label: "Effect", value: "effect" },
          { label: "Impact", value: "impact" }
        ]
      }
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
      this.meta = null;
      this.meta = await this.getMeta(this.data);
    },

    async getMeta(blob) {
      const json = await blob.text();
      const data = JSON.parse(json);
      const converted = this.convert(data);
      return converted;
    },

    // Convert backend data to event-grid format
    convert(data) {
      const columns = data.donors.map(entry => ({
        id: entry.id,
        label: entry.displayId,
        data: {
          age: entry.age,
          sex: entry.sex,
          diagnosis: entry.diagnosis,
          primarySite: entry.primarySite,
          localization: entry.localization,
          progressionStatus: entry.progressionStatus == true ? "Yes" : entry.progressionStatus == false ? "No" : null,
          progressionStatusChangeDay: entry.progressionStatusChangeDay,
          vitalStatus: entry.vitalStatus == true ? "Alive" : entry.vitalStatus == false ? "Deceased" : null,
          vitalStatusChangeDay: entry.vitalStatusChangeDay == true ? "Alive" : entry.vitalStatusChangeDay == false ? "Deceased" : null,
          kps: entry.kps,
          steroidsReactive: entry.steroidsReactive == true ? "Yes" : entry.steroidsReactive == false ? "No" : null
        }
      }));

      const columnTracksGroup = "Donor";
      const columnTracks = [
        {
          group: columnTracksGroup,
          id: "age",
          label: "Age",
          type: "number",
          field: (column) => column.data.age
        },
        {
          group: columnTracksGroup,
          id: "sex",
          label: "Sex",
          field: (column) => column.data.sex
        },
        {
          group: columnTracksGroup,
          id: "vitalStatus",
          label: "Alive",
          field: (column) => column.data.vitalStatus
        },
        {
          group: columnTracksGroup,
          id: "vitalStatusChangeDay",
          label: "OS",
          field: (column) => column.data.vitalStatusChangeDay
        },
        {
          group: columnTracksGroup,
          id: "progressionStatus",
          label: "Progression",
          field: (column) => column.data.progressionStatus
        },
        {
          group: columnTracksGroup,
          id: "progressionStatusChangeDay",
          label: "PFS",
          field: (column) => column.data.progressionStatusChangeDay
        }
      ];

      const rows = data.genes.map(entry => ({
        id: entry.id,
        label: entry.symbol,
        data: {
          chromosome: entry.chromosome,
          strand: entry.strand == true ? "+" : entry.strand == false ? "-" : null,
          biotype: entry.biotype
        }
      }));

      const rowTracksGroup = "Gene";
      const rowTracks = [
        {
          group: rowTracksGroup,
          id: "chromosome",
          label: "Chromosome",
          field: (row) => row.data.chromosome
        },
        {
          group: rowTracksGroup,
          id: "biotype",
          label: "Biotype",
          field: (row) => row.data.biotype
        }
      ];

      const events = data.observations.map(entry => ({
        id: entry.id,
        columnId: entry.donorId,
        rowId: entry.geneId,
        type: entry.effect,
        label: entry.effect,
        data: {
          type: entry.type,
          position: entry.position,
          change: entry.change,
          impact: entry.impact,
          effect: entry.effect
        }
      }));

      return {
        columns: columns,
        columnTracks: columnTracks,
        rows: rows,
        rowTracks: rowTracks,
        events: events,
        palette: this.grouping.value == "effect" ? effectsColorMap
               : this.grouping.value == "impact" ? impactsColorMap
               : null
      };
    }
  }
}
</script>