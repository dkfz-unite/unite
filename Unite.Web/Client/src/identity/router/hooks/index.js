import settings from "../../../settings";
import api from "../../api";

export async function authorize(hook, state) {
  const { to, from, next } = hook;
  const token = localStorage.getItem("token");
  
  if (to.meta?.authorize) {
    if (!token) {
      if (!!state.account) {
        state.account = null;
      }
      const redirect = encodeURI(to.fullPath);
      next({ name: "login", query: { redirect: redirect } });
    } else {
      if (!state.account) {
        state.account = await api.getAccount();
      }
    }
  } else if (to.meta?.anonymous) {
    if (!!token) {
      next({ name: "account" });
    }
  } else {
    // next();
  }
}

export default {
  authorize
}