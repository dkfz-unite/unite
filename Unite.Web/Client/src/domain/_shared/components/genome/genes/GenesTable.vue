<template>
  <div class="col">
    <u-data-table
      :class="class"
      :title="title"
      :loading="loading"
      :scope="scope"
      :columns="columns"
      :rows="rows"
      :rows-total="rowsTotal"
      v-model:rows-selected="dataSelected"
      v-model:from="dataFrom"
      v-model:size="dataSize">
      <template v-slot:header-right>
        <slot name="header-right">
        </slot>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <u-gene-link :id="props.value.id">{{ props.value.symbol }}</u-gene-link>
        </q-td>
      </template>

      <template v-slot:header-cell-expression="props">
        <q-th :props="props">
          <span>
            Expression ( <span>Reads</span> / <span class="text-teal">TPM</span> / <span class="text-purple">FPKM</span> )
          </span>
        </q-th>
      </template>

      <template v-slot:header-cell-reads="props">
        <q-th :props="props">
          <u-expression-stats-header title="Reads" />
        </q-th>
      </template>

      <template v-slot:body-cell-reads="props">
        <q-td :props="props">
          <u-expression-stats-cell v-if="props.value" :value="props.value" />
        </q-td>
      </template>

      <template v-slot:header-cell-tpm="props">
        <q-th :props="props">
          <u-expression-stats-header title="TPM" class="text-teal"/>
        </q-th>
      </template>

      <template v-slot:body-cell-tpm="props">
        <q-td :props="props">
          <u-expression-stats-cell v-if="props.value" :value="props.value" class="text-teal" />
        </q-td>
      </template>

      <template v-slot:header-cell-fpkm="props">
        <q-th :props="props">
          <u-expression-stats-header title="FPKM" class="text-purple" />
        </q-th>
      </template>

      <template v-slot:body-cell-fpkm="props">
        <q-td :props="props">
          <u-expression-stats-cell v-if="props.value" :value="props.value" class="text-purple" />
        </q-td>
      </template>

      <template v-slot:body-cell-expression="props">
        <q-td :props="props">
          <span v-if="props.value">
            <span>{{ props.value.reads?.toLocaleString() }}</span> / <span class="text-teal">{{ props.value.tpm?.toLocaleString() }}</span> / <span class="text-purple">{{ props.value.fpkm?.toLocaleString() }}</span>
          </span>
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import UGeneLink from "@/_shared/components/GeneLink.vue";
import UExpressionStatsHeader from "./cells/ExpressionStatsHeader.vue";
import UExpressionStatsCell from "./cells/ExpressionStatsCell.vue";
import tableMixin from "@/domain/_shared/table-mixin";

import Biotype from "@/_models/domain/genome/genes/enums/biotype";

export default {
  components: {
    UDataTable,
    UGeneLink,
    UExpressionStatsHeader,
    UExpressionStatsCell
  },

  mixins: [tableMixin],

  computed: {
    scope() {
      return "genes";
    },
    
    columns() {
      var columns = [];

      columns.push({
        name: "name",
        label: "Name",
        field: (row) => row,
        sortable: false,
        align: "left",
        required: true
      });

      columns.push({
        name: "location",
        label: "Location",
        field: (row) => this.getLocation(row),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "biotype",
        label: "Biotype",
        field: (row) => this.$helpers.enum.getLabel(row.biotype, Biotype.values),
        sortable: false,
        align: "left"
      });

      if(["donor", "mri", "ct", "tissue", "cell", "organoid", "xenograft"].includes(this.$route.name)){
        columns.push({
          name: "expression",
          label: "Expression",
          field: (row) => row.expression,
          sortable: false,
          align: "right"
        });
      }

      // columns.push({
      //   name: "readsMin",
      //   label: "Reads (Min)",
      //   field: (row) => row.reads?.min,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "readsMax",
      //   label: "Reads (Max)",
      //   field: (row) => row.reads?.max,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "readsMean",
      //   label: "Reads (Mean)",
      //   field: (row) => row.reads?.mean,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "readsMedian",
      //   label: "Reads (Median)",
      //   field: (row) => row.reads?.median,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "tpmMin",
      //   label: "TPM (Min)",
      //   field: (row) => row.tpm?.min,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "tpmMax",
      //   label: "TPM (Max)",
      //   field: (row) => row.tpm?.max,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "tpmMean",
      //   label: "TPM (Mean)",
      //   field: (row) => row.tpm?.mean,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "tpmMedian",
      //   label: "TPM (Median)",
      //   field: (row) => row.tpm?.median,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "fpkmMin",
      //   label: "FPKM (Min)",
      //   field: (row) => row.fpkm?.min,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "fpkmMax",
      //   label: "FPKM (Max)",
      //   field: (row) => row.fpkm?.max,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "fpkmMean",
      //   label: "FPKM (Mean)",
      //   field: (row) => row.fpkm?.mean,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "fpkmMedian",
      //   label: "FPKM (Median)",
      //   field: (row) => row.fpkm?.median,
      //   sortable: false,
      //   show: false
      // });

      // columns.push({
      //   name: "reads",
      //   label: "Reads (Min / Max / Mean / Median)",
      //   field: (row) => `${row.reads?.min} / ${row.reads?.max} / ${row.reads?.mean} / ${row.reads?.median}`,
      //   sortable: false
      // });

      // columns.push({
      //   name: "tpm",
      //   label: "TPM (Min / Max / Mean / Median)",
      //   field: (row) => `${row.tpm?.min} / ${row.tpm?.max} / ${row.tpm?.mean} / ${row.tpm?.median}`,
      //   sortable: false
      // });

      // columns.push({
      //   name: "fpkm",
      //   label: "FPKM (Min / Max / Mean / Median)",
      //   field: (row) => `${row.fpkm?.min} / ${row.fpkm?.max} / ${row.fpkm?.mean} / ${row.fpkm?.median}`,
      //   sortable: false
      // });

      columns.push({
        name: "reads",
        label: "Reads",
        field: (row) => row.reads,
        sortable: false,
        show: false
      });

      columns.push({
        name: "tpm",
        label: "TPM",
        field: (row) => row.tpm,
        sortable: false,
        show: false
      });

      columns.push({
        name: "fpkm",
        label: "FPKM",
        field: (row) => row.fpkm,
        sortable: false,
        show: false
      });

      if (["genes"].includes(this.$route.name)){
        columns.push({
          name: "numberOfDonors",
          label: "#Donors",
          field: (row) => row.numberOfDonors,
          sortable: false
        });

        // columns.push({
        //   name: "numberOfMris",
        //   label: "#MRIs",
        //   field: (row) => row.numberOfMris,
        //   sortable: false,
        //   show: false
        // });

        // columns.push({
        //   name: "numberOfCts",
        //   label: "#CTs",
        //   field: (row) => row.numberOfCts,
        //   sortable: false
        //   show: false
        // });

        // columns.push({
        //   name: "numberOfTissues",
        //   label: "#Tissues",
        //   field: (row) => row.numberOfTissues,
        //   sortable: false,
        //   show: false
        // });

        // columns.push({
        //   name: "numberOfCells",
        //   label: "#Cells",
        //   field: (row) => row.numberOfCells,
        //   sortable: false,
        //   show: false
        // });

        // columns.push({
        //   name: "numberOfOrganoids",
        //   label: "#Organoids",
        //   field: (row) => row.numberOfOrganoids,
        //   sortable: false,
        //   show: false
        // });

        // columns.push({
        //   name: "numberOfXenografts",
        //   label: "#Xenografts",
        //   field: (row) => row.numberOfXenografts,
        //   sortable: false,
        //   show: false
        // });
      }

      columns.push({
        name: "numberOfSsms",
        label: "#SSMs",
        field: (row) => row.numberOfSsms,
        sortable: false
      });

      columns.push({
        name: "numberOfCnvs",
        label: "#CNVs",
        field: (row) => row.numberOfCnvs,
        sortable: false
      });

      columns.push({
        name: "numberOfSvs",
        label: "#SVs",
        field: (row) => row.numberOfSvs,
        sortable: false
      });

      return columns;
    }
  },

  methods: {
    getLocation(gene) {
      if (gene.chromosome && gene.start && gene.end) {
        return `chr${gene.chromosome}:${gene.start}-${gene.end}`;
      } else {
        return null;
      }
    }
  }
};
</script>