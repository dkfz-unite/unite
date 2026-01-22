<template>
  <div class="col q-gutter-y-sm" v-if="classification">
    <div class="row">
      <span class="text-h5 u-text-title">Tumor Classification</span>
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
              <td class="u-text-key">Tumor Superfamily</td>
              <td>{{ classification.superfamily }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Tumor Family</td>
              <td>{{ classification.family }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Tumor Class</td>
              <td>{{ classification.class }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Tumor Subclass</td>
              <td>{{ classification.subclass }}</td>
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
    specimen: Object
  },

  computed:{
    classification(){
      return this.specimen.tumorClassification;
    }
  }
}
</script>