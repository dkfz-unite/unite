<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Clinical Data</span>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-6">
            <q-markup-table class="table-strip" separator="cell" dense flat bordered>
              <colgroup>
                <col span="1" style="width: 50%" />
                <col span="1" style="width: 50%" />
              </colgroup>

              <tbody>
                <tr>
                  <td class="u-text-key">Gender</td>
                  <td>{{ clinicalData.gender }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Age</td>
                  <td>{{ clinicalData.age }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Diagnosis</td>
                  <td>{{ clinicalData.diagnosis }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Diagnosis date</td>
                  <td>{{ contentHelpers.toDateString(clinicalData.diagnosisDate) }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Primary site</td>
                  <td>{{ clinicalData.primarySite }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Localization</td>
                  <td>{{ clinicalData.localization }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Vital Status</td>
                  <td>{{ contentHelpers.toBooleanString(clinicalData.vitalStatus, false, "Living", "Diceased") }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Vital Status Change Date</td>
                  <td>{{ contentHelpers.toDateString(clinicalData.vitalStatusChangeDate) }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">KPS Baseline</td>
                  <td>{{ clinicalData.kpsBaseline }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Steroids Baseline</td>
                  <td>{{ contentHelpers.toBooleanString(clinicalData.steroidsBaseline) }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contentHelpers from "@/services/helpers/helpers.content.js";

export default {
  props: ["donor"],

  data(){
    return{
      contentHelpers: contentHelpers
    }
  },

  computed:{
    clinicalData(){
      return this.donor?.clinicalData;
    }
  },
}
</script>