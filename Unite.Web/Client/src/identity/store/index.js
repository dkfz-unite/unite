import Account from "../models/account";
import api from "../api";
import getters from "./getters";

const module = {
  namespaced: true,

  state: () => ({
    account: null,
    providers: null,
  }),

  getters: getters,

  actions: {
    async loadProviders({state}) {
      try {
        state.providers = await api.getProviders();
        return null;
      } catch (error) {
        state.providers = null;
        return error?.status || error;
      }
    },

    async loadAccount({state}) {
      try {
        const accountData = await api.getAccount();
        const account = new Account(accountData);
        state.account = account;
        return null;
      } catch (error) {
        state.account = null;
        return error.status;
      }
    },

    async createAccount({state}, {email, password, passwordRepeat}) {
      try {
        await api.createAccount(email, password, passwordRepeat);
        return null;
      } catch (error) {
        return error.status;
      }
    },

    async changePassword({state}, {oldPassword, newPassword, newPasswordRepeat}) {
      try {
        const accountData = await api.changePassword(oldPassword, newPassword, newPasswordRepeat);
        const account = new Account(accountData);
        state.account = account;
        return null;
      } catch (error) {
        return error.status;
      }
    },

    async logIn({state}, {email, password, provider}) {
      try {
        await api.logIn(email, password, provider);
        return null;
      } catch (error) {
        return error.status; 
      }
    },

    async logOut({state}) {
      try {
        state.account = null;
        await api.logOut();
        return null;
      } catch (error) {
        return error.status;
      }
    }
  }
}

export default module;