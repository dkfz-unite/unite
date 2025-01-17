export default class Dataset {
  id = null;
  userId = null;
  name = null;
  description = null;
  domain = null;
  date = new Date();
  criteria = null;
  selected = false;
  order = 0;

  static toRecord(dataset) {
    let entry = {};
    entry.id = dataset.id;
    entry.userId = dataset.userId;
    entry.name = dataset.name;
    entry.description = dataset.description;
    entry.domain = dataset.domain;
    entry.date = dataset.date;
    entry.criteria = JSON.stringify(dataset.criteria);

    return entry;
  };

  static fromRecord(stored) {
    let entry = new Dataset();
    entry.id = stored.id;
    entry.userId = stored.userId;
    entry.name = stored.name;
    entry.description = stored.description;
    entry.domain = stored.domain;
    entry.date = stored.date;
    entry.criteria = JSON.parse(stored.criteria);

    return entry;
  }
}
