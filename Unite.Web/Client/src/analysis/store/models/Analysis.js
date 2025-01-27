export default class Analysis {
  id = null;
  name = null;
  description = null;
  type = null;
  status = null;
  date = null;
  parameters = null;
  data = null;

  constructor(id = null) {
    this.id = id;
    this.date = new Date();
  }
}