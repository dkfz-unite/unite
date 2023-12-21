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
    },

    donor: {
      type: Object,
      required: true,
      default: null
    }
  },

  data() {
    return {
      specimens: null,
      current: null
    }
  },

  async mounted() {
    let specimens = await donorApi.searchSpecimens(this.specimen.donorId, { from: 0, size: 1000 });
    specimens = specimens.rows;
    specimens = this.buildNodes(null, specimens);
    specimens = this.filterNodes(specimens, this.specimen.id);

    this.specimens = specimens;
    this.current = this.specimen.id;
  },

  methods: {
    buildNodes(nodes, allNodes) {
      nodes = nodes || allNodes.filter(node => !node.parentId).map(node => this.copyNode(node));

      for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];

        let childNodes = allNodes
          .filter(node => node.parentId == currentNode.id)
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