import UGeneral from './General.vue';
import UDatasets from './Datasets.vue';
import UOptions from './Options.vue';
import Analysis from '../analysis';
import AnalysisType from '../analysis-type';
import { AnalysisTitle } from '../analysis-type';

export default {
  components: {
    UGeneral,
    UDatasets,
    UOptions
  },

  emits: ["request", "submit"],

  data() {
    return {
      dialog: false,
      title: null,
      analysis: null
    }
  },

  methods: {
    show(analysis) {
      this.analysis = analysis;
      this.analysis.name = this.analysis.datasets.map(d => d.name).join(" vs ");
      this.title = AnalysisTitle[this.analysis.type];
      this.dialog = true;
    },

    onClose() {
      this.dialog = false;
      this.analysis.reset();
    },

    onReset() {
      this.analysis.resetOptions();
    },

    onRequest(option) {
      this.$emit("request", option);
    },

    async onSubmit() {
      this.$emit("submit", this.analysis.toPayload());

      const id = await this.$store.dispatch("analysis/runAnalysis", this.analysis.toPayload());
      await this.$router.push({ name: "analysis", params: { id: id } });
    }
  }
}