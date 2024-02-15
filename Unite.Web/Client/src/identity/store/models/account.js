import Permissions from "@/_models/admin/enums/permissions";

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

  get isAdmin() {
    return this.hasPermissions(Permissions.Admin);
  }

  hasPermission(permission) {
    return this.permissions.includes(permission);
  }

  hasPermissions(permissions) {
    return permissions.every(permission => this.hasPermission(permission));
  }

  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.provider = data.provider;
    this.sessions = data.devices;
    this.permissions = data.permissions;
  }
}