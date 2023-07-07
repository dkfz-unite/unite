import api from "../api";
import Account from "./models/account";
import Provider from "./models/provider";

const module = {
  namespaced: true,

  state: () => ({
    account: null,
    providers: null,
  }),

  actions: {
    async signUp({state}, {email, password, passwordRepeat}) {
      try {
        await api.signUp(email, password, passwordRepeat);
        return null;
      } catch (error) {
        return error.status;
      }
    },

    async signIn({state}, {email, password, providerCode}) {
      try {
        await api.signIn(email, password, providerCode);
        return null;
      } catch (error) {
        return error.status; 
      }
    },

    async signOut({state}) {
      try {
        state.account = null;
        await api.signOut();
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

    async load({state}) {
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

    async loadProviders({state}) {
      try {
        const providersData = await api.getProviders();
        const providers = providersData.map(provider => new Provider(provider));
        state.providers = providers;
        return null;
      } catch (error) {
        return error.status;
      }
    },
  }
}

export default module;