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
              <td>{{ variant.structuralVariant.chromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - Start</td>
              <td>{{ variant.structuralVariant.start }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - End</td>
              <td>{{ variant.structuralVariant.end }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - Flanking Sequences</td>
              <td>{{ variant.structuralVariant.flankingSequenceFrom }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Chromosome</td>
              <td>{{ variant.structuralVariant.otherChromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Start</td>
              <td>{{ variant.structuralVariant.otherStart }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - End</td>
              <td>{{ variant.structuralVariant.otherEnd }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Flanking Sequences</td>
              <td>{{ variant.structuralVariant.flankingSequenceTo }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Type</td>
              <td>{{ variant.structuralVariant.type }}</td>
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