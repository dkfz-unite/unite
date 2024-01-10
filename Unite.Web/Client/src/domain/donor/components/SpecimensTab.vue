<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-ancestry v-if="donor && specimens" 
          title="Specimens"
          type="donor"
          :donor="donor"
          :specimens="specimens"
          :current="donor.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UAncestry from "@/domain/_shared/components/specimens/Ancestry.vue";

import api from "../api";

export default {
  components: {
    UAncestry
  },

  props: {
    donor: Object
  },

  data() {
    return {
      loading: false,
      specimens: null
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        let data = await api.searchSpecimens(this.donor.id, { from: 0, size: 1000 });
        this.specimens = this.buildNodes(null, data.rows);
      } catch(error) {
        this.specimens = null;
      } finally {
        this.loading = false;
      }
    },

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

    copyNode(node) {
      return JSON.parse(JSON.stringify(node));
    }
  }
}
</script>