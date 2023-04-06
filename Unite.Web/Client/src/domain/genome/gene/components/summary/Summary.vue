<template>
  <div class="col q-gutter-y-sm" v-if="gene">
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
              <td class="u-text-key">Name</td>
              <td>{{ gene.symbol }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Description</td>
              <td>{{ gene.description }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Biotype</td>
              <td>{{ getBiotypeLabel(gene.biotype) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Chromosome</td>
              <td>{{ gene.chromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Start</td>
              <td>{{ gene.start }}</td>
            </tr>
            <tr>
              <td class="u-text-key">End</td>
              <td>{{ gene.end }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Length</td>
              <td>{{ gene.end - gene.start + 1 }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Exonic Length</td>
              <td>{{ gene.exonicLength }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Strand</td>
              <td>{{ $helpers.content.toBooleanString(gene.strand, false, "+", "-") }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import Biotype from "../../../../../_models/domain/genome/genes/enums/biotype";

export default {
  props: {
    gene: Object
  },

  methods: {
    getBiotypeLabel(value) {
      return this.$helpers.enum.getLabel(value, Biotype.values);
    }
  }
}
</script>