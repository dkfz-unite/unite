<template>
  <div class="col">
    <div class="row">
      <!-- Left -->
      <div class="col-3">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          separator="cell"
          class="sticky-header q-ma-xs"
          :pagination="{ rowsPerPage: 15 }"
          @row-click="reviewRow"
          wrap-cells dense flat bordered
        >
        <!-- @click.stop="reviewRow(props.row)" -->
          <!-- <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                color="primary"
                label="Review"
                dense flat no-caps icon="las la-pen"
                
              />
            </q-td>
          </template> -->
        </q-table>
      </div>

      <!-- Right -->
      <div class="col-9 q-mt-xs" v-if="selectedRow">
        <q-card flat bordered>
          <div class="row justify-between items-center">
            <div>
              Submission Task Id :{{ selectedRow.id }}
            </div>
            <div>
              <u-reject-button :value=selectedRow.id @reject="closRejectPanel"/>
              <q-btn color="primary" label="Approve" style: icon="las la-chevron-circle-down" dense flat no-caps @click="approveSubmission"/>
            </div>
          </div>

          <div class="row">
            <div class="col" style="height: 500px;">
              <pre class="fit" style=" border: 1px solid black; overflow-x: auto">
                {{ this.convertedJsonData }}
              </pre>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api-submissions";
import URejectButton from '../components/submissions/RejectButton.vue';

import DonorsApi from "../../domain/donors/api";
import ImagesApi from "../../domain/images/mris/api";
import SpecimensApi from "../../domain/specimens/_shared/specimens/api";
import Papa from "papaparse";

export default {
  components: {
    URejectButton,
   },
  setup() {
    return {
      donorsApi: new DonorsApi(),
      imagesApi: new ImagesApi(),
      specimensApi: new SpecimensApi(),
    };
  },
  data() {
    return {
      rows: [],
      columns: [
        { name: 'id', label: 'Id', align: 'center', field: 'id' },
        { name: 'date', label: 'Date', align: 'center', field: 'date' },
        { name: 'type', label: 'SubmissionType', align: 'left', field: 'type'},
        // { name: 'action', label: 'Action', align: 'left' },
      ],
      loading: false,
      error: null,
      selectedRow: null,
      approvalStatus: null,
      selectedSubmissionDocument: null,
      convertedJsonData: null
    };
  },

  mounted() {
    this.loadSubmissions();
  },

  methods: {
    async loadSubmissions() {
      this.loading = true;
      this.error = null;
      try {
        this.rows = await api.getDonorsSubmission();
      } catch (err) {
        this.error = 'Failed to load data. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async reviewRow(event, row, index) {
      this.selectedRow = row
      const donorSubmissions = ["DON", "DON_TRT"];
      const imageSubmissions = ["MRI"];
      const specimenSubmissions = ["MAT", "LNE", "ORG", "XEN", "SPE_INT", "SPE_DRG", "DNA_SSM", "DNA_CNV", "DNA_SV", "RNA_EXP", "RNASC_EXP"];
      const genomeSubmissions = ["DNA_SSM", "DNA_CNV", "DNA_SV", "RNA_EXP", "RNASC_EXP"];

      if (donorSubmissions.includes(row.type)) {
        this.selectedSubmissionDocument = await this.donorsApi.getDonorSubmissionDocument(row.id, row.type);
      } else if (imageSubmissions.includes(row.type)) {
        this.selectedSubmissionDocument = await this.imagesApi.getMriSubmissionDocument(row.id);
      } else if (specimenSubmissions.includes(row.type)) {
        this.selectedSubmissionDocument = await this.specimensApi.getSpecimenSubmissionDocument(row.id);
      // } else if (genomeSubmissions.includes(row.type)) {
      //   this.selectedSubmissionDocument = await this.specimensApi.getSpecimenSubmissionDocument(row.id);
      } else {
        this.selectedSubmissionDocument = "Invalid Submission Type";
      }

      this.convertedJsonData = this.convertJsonToTsv(this.selectedSubmissionDocument);
    },

    async approveSubmission() {
       this.approvalStatus = await api.updateSubmissionToPrepared(this.selectedRow.id);
       
       if (this.approvalStatus) {
        this.loadSubmissions();
        this.notifySuccess(`${this.selectedRow.id}  approved`);
        this.selectedRow = null;
       } else {
        alert("Approval failed!!")
       }
    },

    async notifySuccess(message, caption = undefined) {
      this.$q.notify({
        type: "positive",
        position: "bottom-right",
        timeout: 5000,
        message: message,
        caption: caption
      });
    },

    async notifyReject(message, caption = undefined) {
      this.$q.notify({
        type: "negative",
        position: "bottom-right",
        timeout: 5000,
        message: message,
        caption: caption
      });
    },

    closRejectPanel(rejectStatus)
    {
      if(rejectStatus)
      {
        this.loadSubmissions();
        this.notifyReject(`${this.selectedRow.id}  rejected`);
        this.selectedRow = null;
      }
    },

    convertJsonToTsv(jsonArray) 
    {
      if (!jsonArray.length) return '';
      const flattenedData = jsonArray.map((item) => this.flattenInnerNodes(item));
      const tsvData = Papa.unparse(flattenedData, {
        delimiter: "\t" 
      });
      return tsvData;
    },

    flattenInnerNodes(obj, parentKey = "", result = {}) {
      for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          this.flattenInnerNodes(value, newKey, result);
        } else {
          result[newKey] = value;
        }
      }
      return result;
    }
  }
};
</script>
