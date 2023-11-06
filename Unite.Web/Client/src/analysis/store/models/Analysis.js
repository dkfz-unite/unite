export default class AnalysisStore {
  key = null;
  name = null;
  description = null;
  type = null;
  status = null;
  date = null;
  parameters = null;
  data = null;

  constructor(key = null) {
    this.key = key;
    this.date = new Date();
  }
}