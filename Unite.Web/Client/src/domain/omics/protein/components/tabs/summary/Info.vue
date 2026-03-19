<template>
  <div class="col q-gutter-y-sm" v-if="protein">
    <div class="row">
      <div class="col q-gutter-y-sm">
        <div class="row">
          <span class="text-h5 u-text-title">Public References</span>
        </div>

        <div class="row">
          <div class="col">
            <q-markup-table class="table-strip" separator="cell" dense flat bordered>
              <colgroup>
                <col span="1" style="width: 100%" />
              </colgroup>

              <tbody>
                <tr v-if="hasUniprotLink">
                  <td><u-link-external :to="getUniprotLink(protein.accessionId)">UniProt</u-link-external></td>
                </tr>
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
  props: {
    protein: Object
  },

  computed: {
    hasUniprotLink() {
      return this.protein?.database?.startsWith("Uniprot");
    }
  },

  methods: {
    getUniprotLink(accessionId) {
      if (!accessionId) return null;
      else return `https://www.uniprot.org/uniprotkb/${accessionId}/entry`;
    }
  }
}
</script>