import Permissions from "../models/permissions";

const getters = {
  account: (state) => {
    return state.account;
  },

  isAdmin: (state, getters) => {
    return getters.hasPermissions(Permissions.Admin);
  },

  canWriteData: (state, getters) => {
    return getters.hasPermission(Permissions.Data.Write);
  },

  canWriteUsers: (state, getters) => {
    return getters.hasPermission(Permissions.Users.Write);
  },

  hasPermission: (state, getters) => (permission) => {
    return state.account?.permissions?.includes(permission);
  },

  hasPermissions: (state, getters) => (permissions) => {
    return permissions?.every(permission => getters.hasPermission(permission));
  },
};

export default getters;