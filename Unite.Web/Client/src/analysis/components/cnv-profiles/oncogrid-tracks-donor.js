import OncoGridTrack from "./oncogrid-track.js";

function sortInt(field) {
  return function (a, b) {
    return a[field] - b[field];
  };
}

function sortBool(field) {
  return function (a, b) {
    return b[field] - a[field];
  }
}

function sortString(field) {
  return function (a, b) {
    return a[field].localeCompare(b[field]);
  };
}

const donorTracks = [
  new OncoGridTrack("Clinical Data", "Age", "age", "age", sortInt),
  new OncoGridTrack("Clinical Data", "Sex", "sex", "sex", sortString),
  new OncoGridTrack("Clinical Data", "Alive", "vitalStatus", "vitalStatus", sortBool),
  new OncoGridTrack("Clinical Data", "Progression", "progressionStatus", "progressionStatus", sortBool)
];

export default donorTracks;