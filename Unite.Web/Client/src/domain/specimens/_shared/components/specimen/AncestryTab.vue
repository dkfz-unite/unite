<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-ancestry v-if="donor && specimens && current"
          title="Ancestry"
          type="specimen"
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
    specimens = specimens.rows;
    specimens = this.buildNodes(null, specimens);
    specimens = this.filterNodes(specimens, specimen.id);

    this.donor = donor;
    this.specimens = specimens;
    this.current = specimen.id;
  },

  methods: {
    buildNodes(nodes, allNodes) {
      nodes = nodes || allNodes.filter(node => !node.parent).map(node => this.copyNode(node));

      for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];

        let childNodes = allNodes
          .filter(node => node.parent?.id == currentNode.id)
          .map(node => this.copyNode(node));

        if (childNodes?.length) {
          this.buildNodes(childNodes, allNodes);
          currentNode.children = childNodes;
        }
      }

      return nodes;
    },

    filterNodes(nodes, id) {
      var branches = [];

      for (let i = 0; i < nodes.length; i++) {
        var branch = this.copyNode(nodes[i]);
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
    },

    copyNode(node) {
      return JSON.parse(JSON.stringify(node));
    }
  }
}
</script>