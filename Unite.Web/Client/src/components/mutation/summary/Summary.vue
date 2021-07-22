<template>
  <div class="col q-gutter-y-sm" v-if="mutation">
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
              <td class="u-text-key">DNA Change</td>
              <td>{{ mutation.code }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Sequence Type</td>
              <td>{{ getSequenceType(mutation.sequenceType) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Type</td>
              <td>{{ mutation.type }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Chromosome</td>
              <td>{{ mutation.chromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Start</td>
              <td>{{ mutation.start }}</td>
            </tr>
             <tr>
              <td class="u-text-key">End</td>
              <td>{{ mutation.end }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Reference Base</td>
              <td>{{ mutation.ref }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Alternate Base</td>
              <td>{{ mutation.alt }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import SequenceType from "@/services/criteria/filters/data/mutations/filter.option.sequence.type.js";

export default {
  props: ["mutation"],

  methods:{
    getSequenceType(value){
      var sequenceType = new SequenceType(value);

      return sequenceType.label;
    }
  }
};
</script>