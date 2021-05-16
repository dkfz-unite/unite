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
                  <td>{{ toDateString(clinicalData.diagnosisDate) }}</td>
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
                  <td>{{ toVitalStatusString(clinicalData.vitalStatus) }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Vital Status Change Date</td>
                  <td>{{ toDateString(clinicalData.vitalStatusChangeDate) }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">KPS Baseline</td>
                  <td>{{ clinicalData.kpsBaseline }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Steroids Baseline</td>
                  <td>{{ toBooleanString(clinicalData.steroidsBaseline) }}</td>
                </tr>
                <template v-if="epigeneticsData">
                  <tr>
                    <td class="u-text-key">Gene Expression Subtype</td>
                    <td>{{ epigeneticsData.geneExpressionSubtype }}</td>
                  </tr>
                  <tr>
                    <td class="u-text-key">IDH</td>
                    <td>{{ getIdh(epigeneticsData.idhStatus, epigeneticsData.idhMutation) }}</td>
                  </tr>
                  <tr>
                    <td class="u-text-key">MGMT</td>
                    <td>{{ getMgmt(epigeneticsData.methylationStatus, epigeneticsData.methylationSubtype) }}</td>
                  </tr>
                  <tr>
                    <td class="u-text-key">G-Cimp Methylation</td>
                    <td>{{ toBooleanString(epigeneticsData.gcimpMethylation) }}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td class="u-text-key"></td>
                    <td></td>
                  </tr>
                </template>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["donor"],

  computed:{
    clinicalData(){
      return this.donor?.clinicalData;
    },

    epigeneticsData(){
      return this.donor?.epigeneticsData;
    }
  },

  methods:{
    toDateString(jsonValue) {
      if (!jsonValue) {
        return null;
      }

      var date = new Date(jsonValue);
      return date.toLocaleDateString();
    },

    toBooleanString(jsonValue) {
      if (jsonValue == null || jsonValue == undefined) {
        return null;
      }

      return jsonValue ? "Yes" : "No";
    },

    toVitalStatusString(jsonValue){
      if (jsonValue == null || jsonValue == undefined) {
        return null;
      }

      return jsonValue ? "Living" : "Diceased";
    },

    getIdh(idhStatus, idhMutation){
      return idhMutation ?? idhStatus;
    },

    getMgmt(methylationStatus, methylationSubtype){
      return methylationSubtype ?? methylationStatus;
    }
  }
};
</script>