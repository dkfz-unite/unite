/**
 * Extracts enum label by it's value from enum type.
 * @param {*} value Enum value
 * @param {*} type Enum type
 * @returns Enum label if exists in enum type declaration, otherwise initial value.
 */
export function getLabel(value, type) {
  for (const label in type) {
    if (type[label] == value) {
      return label;
    }
  }

  return value;
}

export default {
  getLabel
}
