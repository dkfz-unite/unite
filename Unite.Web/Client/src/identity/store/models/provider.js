export default class Provider {
  id = null;
  name = null;
  label = null;
  priority = null;

  get title() {
      return this.label ?? this.name;
  }

  constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.label = data.label;
      this.priority = data.priority;
  }
}