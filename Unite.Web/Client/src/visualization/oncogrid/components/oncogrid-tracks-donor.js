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
    new OncoGridTrack("Clinical Data", "Gender", "gender", "gender", sortString),
    new OncoGridTrack("Clinical Data", "Vital Status", "vitalStatus", "vitalStatus", sortBool)
];

export default donorTracks;