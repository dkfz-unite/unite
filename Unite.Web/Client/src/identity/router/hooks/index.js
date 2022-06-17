import tokenHelpers from "@/_shared/helpers/token-helpers";

export async function authorize(hook, store) {
  const { to, from, next } = hook;
  const token = tokenHelpers.get();
  
  if (to.meta?.authorize) {
    if (!token) {
      // If no token is present, redirect to login
      if (!!store.state["identity"].account) {
        store.state["identity"].account = null;
      }
      const redirect = encodeURI(to.fullPath);
      return { name: "login", query: { redirect: redirect } };
    } else {
      // If no account is present, load account
      if (!store.state["identity"].account) {
        const error = await store.dispatch("identity/load");
        if (error) {
          // If account load fails, redirect to login
          return { name: "login" };
        }
      }
      // Check account permissions if required
      if (to.meta?.authorize.permissions) {
        const authorized = store.state["identity"].account.hasPermissions(to.meta?.authorize.permissions);
        if (!authorized) {
          // If permissions are not met, redirect to account
          return { name: "account" };
        }
      }
    }
  } else if (to.meta?.anonymous) {
    if (!!token) {
      return { name: "account" };
    }
  } else {
    return null;
  }
}

export default {
  authorize
}