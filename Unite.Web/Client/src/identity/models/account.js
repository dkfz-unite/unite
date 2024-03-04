export default class Account {
  id = null;
  email = null;
  provider = null;
  sessions = null;
  permissions = null;

  get permissionsGrouped() {
    return this.permissions?.reduce((groups, permission) => {
      let blocks = permission.split(".");
      let group = groups.find(grp => grp.name == blocks[0]);
      if (!group) {
        group = { name: blocks[0], values: [] };
        groups.push(group);
      }
      group.values.push(blocks[1]);
      return groups;
    }, []);
  }

  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.provider = data.provider;
    this.sessions = data.devices;
    this.permissions = data.permissions;
  }
}