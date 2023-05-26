export default class FilterOption {
  label = null;
  value = null;
  amount = null;
  total = null;

  constructor(label, value, amount = null, total = null) {
    this.label = label;
    this.value = value;
    this.amount = amount;
    this.total = total;
  }
}