Object.defineProperty(Array.prototype, "groupBy", {
  value: function (property = (item) => item) {
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
  },
});
