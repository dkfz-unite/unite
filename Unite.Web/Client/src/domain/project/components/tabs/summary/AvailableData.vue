<template>
  <div class="col q-gutter-y-sm" v-if="project">
    <div class="row">
      <span class="text-h5 u-text-title">Available Data</span>
    </div>

    <div class="row">
      <div class="col">
        <q-markup-table class="table-strip" separator="cell" dense flat bordered>
          <colgroup>
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '80%' }" />
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '20%' }" />
          </colgroup>

          <thead>
            <tr>
              <th class="bg-grey-3" align="left"><span>Data type</span></th>
              <th class="bg-grey-3" align="left"><span>Available for N' donors / Total</span></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="u-text-key">MR images</td>
              <td>{{ getNumbers(project.stats.images.mr.number) }}</td>
            </tr>
            <!-- <tr>
              <td class="u-text-key">CT images</td>
              <td>{{ getNumbers(project.stats.images.ct.number) }}</td>
            </tr> -->
            <tr>
              <td class="u-text-key">Materials</td>
              <td>{{ getNumbers(project.stats.specimens.material.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Cell lines</td>
              <td>{{ getNumbers(project.stats.specimens.line.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Organoids</td>
              <td>{{ getNumbers(project.stats.specimens.organoid.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Xenografts</td>
              <td>{{ getNumbers(project.stats.specimens.xenograft.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Simple mutations (SM)</td>
              <td>{{ getNumber(project.stats.dna.sm.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Copy number variants (CNV)</td>
              <td>{{ getNumber(project.stats.dna.cnv.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Structural variants (SV)</td>
              <td>{{ getNumber(project.stats.dna.sv.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">DNA Methylation</td>
              <td>{{ getNumber(project.stats.meth.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Bulk Gene expressions</td>
              <td>{{ getNumber(project.stats.rna.number) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Single cell Gene expressions</td>
              <td>{{ getNumber(project.stats.rnasc.number) }}</td>
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
    project: {
      type: Object,
      default() {
        return null;
      }
    }
  },

  methods: {
    getNumber(value) {
      return value > 0 ? `${value}` : `-`;
    },
    getNumbers(value) {
      return value[0] > 0 ? `${value[0]}/${value[1]}` : `-`;
    }
  }
}
</script>