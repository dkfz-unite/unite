<template>
  <div class="col q-gutter-y-sm" v-if="variant">
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
              <td class="u-text-key">Chromosome</td>
              <td>{{ variant.chromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Start</td>
              <td>{{ variant.start.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">End</td>
              <td>{{ variant.end.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Length</td>
              <td>{{ (variant.end - variant.start + 1).toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Type</td>
              <td>
                <span v-if="!!variant.copyNumberVariant.type">{{ variant.copyNumberVariant.type }}</span>
                <span v-if="!!variant.copyNumberVariant.loh"> LOH</span>
                <span v-if="!!variant.copyNumberVariant.homoDel"> HomoDel</span>
              </td>
            </tr>
            <tr>
              <td class="u-text-key">Genotype</td>
              <td>{{ getGenotype(variant.copyNumberVariant) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">C1 Mean</td>
              <td>{{ variant.copyNumberVariant.c1Mean?.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">C2 Mean</td>
              <td>{{ variant.copyNumberVariant.c2Mean?.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">TCN Mean</td>
              <td>{{ variant.copyNumberVariant.tcnMean?.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">DH Max</td>
              <td>{{ variant.copyNumberVariant.dhMax?.toLocaleString() }}</td>
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
    variant: Object
  },

  methods: {
    getGenotype(cnv) {
        if (!cnv.c1 && !cnv.c2) {
          return null;
        } else {
          return `${cnv.c1 == -1 ? "sub" : cnv.c1} : ${cnv.c2 == -1 ? "sub" : cnv.c2}`;
        }
      }
  }
}
</script>