// donors
function getColumns(elements) {
  return elements.map(element => {
    return {
      id: element.id,
      symbol: element.displayId,
      gender: element.gender,
      age: element.age,
      vitalStatus: element.vitalStatus,
      progressionStatus: element.progressionStatus
    }
  });
}

// genes
function getRows(elements) {
  return elements.map(element => {
    return {
      id: element.id,
      symbol: element.symbol,
      biotype: element.biotype,
      chromosome: element.chromosome,
      strand: element.strand
    }
  });
}

// observations
function getEntries(elements) {
  return elements.map(element => {
    return {
      id: element.id,
      rowId: element.geneId,
      columnId: element.donorId,
      ssm: {
        code: element.code,
        impact: element.impact,
        effect: element.effect
      }
    }
  });
}

function GetColumnTracks() {
  return [
    { group: "Donor", name: "Sex", fieldName: "gender" },
    { group: "Donor", name: "Age", fieldName: "age" },
    { group: "Donor", name: "Alive", fieldName: "vitalStatus" },
    { group: "Donor", name: "Progression", fieldName: "progressionStatus" }
  ]
}

function GetRowTracks() {
  return [
    { group: "Gene", name: "Biotype", fieldName: "biotype" },
    { group: "Gene", name: "Chromosome", fieldName: "chromosome" },
    { group: "Gene", name: "Strand", fieldName: "strand" }
  ]
}

function prepare(data) {
  return {
    columns: getColumns(data.donors),
    rows: getRows(data.genes),
    entries: getEntries(data.observations),
    columnFields: GetColumnTracks(),
    rowFields: GetRowTracks(data.genes)
  };
}

export default {
  prepare
};