<template>
  <div class="col q-gutter-y-sm" v-if="donor">
    <div class="row">
      <span class="text-h5 u-text-title">Available Data</span>
    </div>

    <div class="row">
      <div class="col">
        <q-markup-table class="table-strip" separator="cell" dense flat bordered>
          <colgroup>
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '30%' }" />
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '70%' }" />
          </colgroup>

          <tbody>
            <tr>
              <td class="u-text-key">Clinical Data</td>
              <td>
                <q-icon v-if="hasClinicalData" color="green" size="sm" name="las la-check" />
                <q-icon v-else color="grey" size="sm" name="las la-minus" />
              </td>
            </tr>
            <tr>
              <td class="u-text-key">Treatment Data</td>
              <td>
                <q-icon v-if="hasTreatmentData" color="green" size="sm" name="las la-check" />
                <q-icon v-else color="grey" size="sm" name="las la-minus" />
              </td>
            </tr>
            <tr>
              <td class="u-text-key">Mutations</td>
              <td>
                <q-icon v-if="hasMutations" color="green" size="sm" name="las la-check" />
                <q-icon v-else color="grey" size="sm" name="las la-minus" />
              </td>
            </tr>
            <tr>
              <td class="u-text-key">Images</td>
              <td>
                <q-icon v-if="hasImages" color="green" size="sm" name="las la-check" />
                <q-icon v-else color="grey" size="sm" name="las la-minus" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    donor: {
      type: Object,
      default() {
        return null;
      }
    }
  },

  computed:{
    hasClinicalData(){
      return this.donor?.clinicalData;
    },

    hasTreatmentData(){
      return this.donor?.treatments?.length;
    },

    hasMutations(){
      return this.donor?.numberOfMutations;
    },

    hasImages(){
      return this.donor?.numberOfImages;
    }
  }
}
</script>