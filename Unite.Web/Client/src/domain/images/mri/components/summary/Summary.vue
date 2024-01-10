<template>
  <div class="col q-gutter-y-sm" v-if="image">
    <div class="row">
      <span class="text-h5 u-text-title">Summary</span>
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
              <td class="u-text-key">ID</td>
              <td class="text-bold">{{ image.id }}</td>
            </tr>
            <tr>
              <td class="u-text-key">External ID</td>
              <td class="text-bold">{{ image.mri.referenceId }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Scanning Day</td>
              <td>{{ image.mri.creationDay }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>

    <div class="row">
      <span class="text-h5 u-text-title">Dimensions</span>
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
              <td class="u-text-key">Whole Tumor (cm³)</td>
              <td>{{ image.mri.wholeTumor?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Contrast Enhancing (cm³)</td>
              <td>{{ image.mri.contrastEnhancing?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Non Contrast Enhancing (cm³)</td>
              <td>{{ image.mri.nonContrastEnhancing?.toFixed(3) }}</td>
            </tr>

            <tr>
              <td class="u-text-key">Median ADC Tumor</td>
              <td>{{ image.mri.medianAdcTumor?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Median ADC CE</td>
              <td>{{ image.mri.medianAdcCe?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Median ADC Edema</td>
              <td>{{ image.mri.medianAdcEdema?.toFixed(3) }}</td>
            </tr>

            <tr>
              <td class="u-text-key">Median CBF Tumor</td>
              <td>{{ image.mri.medianCbfTumor?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Median CBF CE</td>
              <td>{{ image.mri.medianCbfCe?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Median CBF Edema</td>
              <td>{{ image.mri.medianCbfEdema?.toFixed(3) }}</td>
            </tr>

            <tr>
              <td class="u-text-key">Median CBV Tumor</td>
              <td>{{ image.mri.medianCbvTumor?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Median CBV CE</td>
              <td>{{ image.mri.medianCbvCe?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Median CBV Edema</td>
              <td>{{ image.mri.medianCbvEdema?.toFixed(3) }}</td>
            </tr>

            <tr>
              <td class="u-text-key">Median MTT Tumor</td>
              <td>{{ image.mri.medianMttTumor?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Median MTT CE</td>
              <td>{{ image.mri.medianMttCe?.toFixed(3) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Median MTT Edema</td>
              <td>{{ image.mri.medianMttEdema?.toFixed(3) }}</td>
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
    image: Object
  }
}
</script>