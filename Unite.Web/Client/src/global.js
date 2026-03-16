// Object.defineProperty(Array.prototype, "groupBy", {
//   value: function (property = (item) => item) {
//     const map = new Map();
//     this.forEach((item) => {
//       const key = property(item);
//       const collection = map.get(key);
//       if (!collection) {
//           map.set(key, [item]);
//       } else {
//           collection.push(item);
//       }
//     });
//     return map;
//   },
// });

Array.prototype.groupBy = function (property = (item) => item) {
  const map = new Map();
  this.forEach((item) => {
    const key = property(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

Array.prototype.distinct = function () {
  return [...new Set(this)];
};

Math.roundTo = function(number, decimals = 0) {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
};
