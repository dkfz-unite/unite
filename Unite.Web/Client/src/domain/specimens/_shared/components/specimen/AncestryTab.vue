<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-ancestry v-if="donor && specimens && current"
          title="Ancestry"
          :donor="donor" 
          :specimens="specimens"
          :current="current"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UAncestry from "@/domain/_shared/components/specimens/Ancestry.vue";
import specimenApi from "@/domain/specimens/_shared/api/specimen";
import donorApi from "@/domain/donor/api";
export default {
  components: {
    UAncestry
  },

  props: {
    specimen: {
      type: Object,
      required: true,
      default: null
    }
  },

  data() {
    return {
      donor: null,
      specimens: null,
      current: null
    }
  },

  async mounted() {
    let specimen = this.specimen ?? await specimenApi.get(this.$route.params.id);
    let donor = await donorApi.get(specimen.donorId);
    let specimens = await donorApi.searchSpecimens(donor.id, { from: 0, size: 1000 });
    specimens = specimens.rows.filter(row => !row.parent);
    specimens = this.filterNodes(specimens, specimen.id);

    this.donor = donor;
    this.specimens = specimens;
    this.current = specimen.id;
  },

  methods: {
    filterNodes(nodes, id) {
      var branches = [];

      for (let i = 0; i < nodes.length; i++) {
        // Deep copy of the node to keep the function clear
        var branch = JSON.parse(JSON.stringify(nodes[i]));
        if (branch.id == id) {
          branches.push(branch);
        } else {
          if (this.containsSubnode(branch, id)) {
            branches.push(branch);
            if (branch.children?.length) {
              branch.children = this.filterNodes(branch.children, id);
            }
          }
        }
      }

      return branches;
    },

    containsSubnode(node, id) {
      if (node.id == id) {
        return true;
      }
      if (node.children?.length) {
        for (let i = 0; i < node.children.length; i++) {
          if (this.containsSubnode(node.children[i], id)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
</script>