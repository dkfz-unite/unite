<template>
  <div class="col q-gutter-y-sm" v-if="gene">
    <div class="row" v-if="hasLinks">
      <div class="col q-gutter-y-sm">
        <div class="row">
          <span class="text-h5 u-text-title">Public References</span>
        </div>

        <div class="row">
          <div class="col">
            <q-markup-table
              class="table-strip" separator="cell"
              dense flat bordered
            >
              <colgroup>
                <col span="1" style="width: 100%" />
              </colgroup>

              <tbody>
                <tr v-if="gene.ensemblId">
                  <td>
                    <a class="u-link" :href="'http://feb2014.archive.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=' + gene.ensemblId" target="blank">
                      <div class="row">
                        <q-icon name="las la-external-link-alt" size="xs" />
                        Ensembl
                      </div>
                    </a>
                  </td>
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
  props: ["gene"],

  computed: {
    hasLinks() {
      return !!this.gene.ensemblId;
    }
  }
}
</script>