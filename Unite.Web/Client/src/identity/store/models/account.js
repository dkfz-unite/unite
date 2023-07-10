import Permissions from "@/_models/admin/enums/permissions";

export default class Account {
    id = null;
    email = null;
    sessions = null;
    permissions = null;
    provider = null;

    get permissionsGrouped() {
        return this.permissions?.reduce((groups, permission) => {
            var blocks = permission.split(".");
            var group = groups.find(grp => grp.name == blocks[0]);
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
        return this.permissions.some(permission => permissions.includes(permission));
    }

    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.sessions = data.devices;
        this.permissions = data.permissions;
        this.provider = data.provider;
    }
}