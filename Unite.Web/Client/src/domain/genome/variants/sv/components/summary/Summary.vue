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
              <td class="u-text-key">1st Breakpoint - Chromosome</td>
              <td>{{ variant.sv.chromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - Start</td>
              <td>{{ variant.sv.start.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - End</td>
              <td>{{ variant.sv.end.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - Flanking Sequences</td>
              <td>{{ variant.sv.flankingSequenceFrom }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Chromosome</td>
              <td>{{ variant.sv.otherChromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Start</td>
              <td>{{ variant.sv.otherStart.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - End</td>
              <td>{{ variant.sv.otherEnd.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Flanking Sequences</td>
              <td>{{ variant.sv.flankingSequenceTo }}</td>
            </tr>
            <tr v-if="!!variant.sv.length">
              <td class="u-text-key">Length</td>
              <td>{{ variant.sv.length.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Type</td>
              <td>{{ variant.sv.type }}</td>
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
    variant: Object,
    default: () => null
  }
}
</script>