<template>
  <table>
    <tr>
      <td>
        <q-spinner v-if="loading" />
        <q-table  style="width: 500px; user-select: text;"
        :rows="rows"
        :columns="columns"
        row-key="id"
        separator="cell"
        class="sticky-header"      
        :pagination="{ rowsPerPage: 15 }"
        wrap-cells dense
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                color="primary"
                label="Review"
                dense flat no-caps style: icon="svguse:/icons.svg#square-pen-solid" 
                @click.stop="reviewRow(props.row)"
              />
            </q-td>
          </template>
        </q-table>
        <q-banner v-if="error" class="q-mt-md" color="red" text-color="white">
          {{ error }}
        </q-banner>
      </td>
      <td>
        <div v-if="selectedRow">
          <table>
            <tr align="center">
              <label style="user-select: text;">Submission TaskId :{{ selectedRow.id }}</label>
              <br>
              <br>
              <br>
            </tr>
            <tr align="center">
              <div class="container">
                <div class="row">
                  <div class="col-xs-5">
                    <RejectButton :value = selectedRow.id @reject="closRejectPanel"/>
                  </div>
                  <div class="col-xs-6">
                    <q-btn color="primary" label="Approve" style: icon="svguse:/icons.svg#circle-check-regular" dense flat no-caps @click="approveSubmission"/>
                  </div>
                </div>
              </div>
            </tr>
            <tr>
              <pre style="max-height: 400px; max-width: 800px; overflow-x: auto; padding: 1px; border: 1px solid #ddd;  user-select: text;">
                {{ this.convertedJsonData }}
              </pre>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import api from "../api/api-submissions";
import RejectButton from '../components/submissions/RejectButton.vue';

import DonorsApi from "../../domain/donors/api";
import ImagesApi from "../../domain/images/mris/api";
import SpecimensApi from "../../domain/specimens/_shared/specimens/api";
import Papa from "papaparse";

export default {
  components: {
    RejectButton,
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
        { name: 'action', label: 'Action', align: 'left' },
      ],
      loading: false,
      error: null,
      selectedRow: null,
      approvalStatus: null,
      selectedSubmissionDocument: null,
      convertedJsonData: null
    };
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
    async reviewRow(row) {
      this.selectedRow = row
      switch(row.type) 
      {
        case "DON":
        case "DON_TRT":
          this.selectedSubmissionDocument = await this.donorsApi.getDonorSubmissionDocument(row.id, row.type);
          break;
        case "MRI":
          this.selectedSubmissionDocument = await this.imagesApi.getMriSubmissionDocument(row.id);
          break;
        case "MAT":
        case "LNE":
        case "ORG":
        case "XEN":
        case "SPE_INT":
        case "SPE_DRG":
          this.selectedSubmissionDocument = await this.specimensApi.getSpecimenSubmissionDocument(row.id);
          break;
        case "DNA_SSM":
        case "DNA_CNV":
        case "DNA_SV":
        case "RNA_EXP":
        case "RNASC_EXP":
          this.selectedSubmissionDocument = await this.specimensApi.getSpecimenSubmissionDocument(row.id);
          break;
        default:
          this.selectedSubmissionDocument = "Invalid Submission Type";
          break;
      }
      this.convertedJsonData = this.convertJsonToTsv(this.selectedSubmissionDocument);
    },
    async approveSubmission() {
       this.approvalStatus = await api.updateSubmissionToPrepared(this.selectedRow.id);
       if(this.approvalStatus)
       {
        this.loadSubmissions();
        this.notifySuccess(`${this.selectedRow.id}  approved`);
        this.selectedRow = null;
       }
       else
       {
        alert("Approval failed!!")
       }
    },
    async notifySuccess(message, caption = undefined) {
      this.$q.notify({
        type: "positive",
        position: "center",
        timeout: 5000,
        message: message,
        caption: caption
      });
    },
    async notifyReject(message, caption = undefined) {
      this.$q.notify({
        type: "negative",
        position: "center",
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
  },
    mounted() {
      this.loadSubmissions();
    }
};
</script>
