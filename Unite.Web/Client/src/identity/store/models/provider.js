export default class Provider {
  name = null;
  label = null;
  priority = null;

  get title() {
      return this.label ?? this.name;
  }

  constructor(data) {
      this.name = data.name;
      this.label = data.label;
      this.priority = data.priority;
  }
}