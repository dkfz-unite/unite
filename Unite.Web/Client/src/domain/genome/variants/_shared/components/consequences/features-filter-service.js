import FeatureFiltersCriteria from "./feature-filters-criteria";

export function filter(features = [], criteria = new FeatureFiltersCriteria()) {
  let filters = [];

  if (criteria.gene?.length) {
    filters.push((row) => {
      return criteria.gene.some(value => row.gene?.symbol == value);
    });
  }

  if (criteria.chromosome?.length) {
    filters.push((row) => {
      return criteria.chromosome.some(value => row.transcript?.feature.chromosome == value)
          || criteria.chromosome.some(value => row.regulator?.feature.chromosome == value)
          || criteria.chromosome.some(value => row.motif?.feature.chromosome == value);
    });
  }

  if (!!criteria.position?.from) {
    filters.push((row) => {
      return row.transcript?.feature.start >= criteria.position.from
          || row.regulator?.feature.start >= criteria.position.from
          || row.motif?.feature.start >= criteria.position.from;
    });
  }

  if (!!criteria.position?.to) {
    filters.push((row) => {
      return row.transcript?.feature.end <= criteria.position.to
          || row.regulator?.feature.end <= criteria.position.to
          || row.motif?.feature.end <= criteria.position.to;
    });
  }

  //TODO: Group if grouping filter is set

  return features.filter(feature => {
    return filters.every(filter => filter(feature));
  });
}

export default {
  filter
}