import { Cookies } from "quasar";
import settings from "../../../settings";
import api from "../../api";

export async function authorize(hook, state) {
  const { to, from, next } = hook;
  
  if (to.meta?.authorize) {
    const session = Cookies.get(settings.cookies.sessionCookieName);
    if (!session) {
      state.account = null;
      next({ name: "login" });
    } else {
      try {
        state.account = await api.getAccount();
      } catch (error) {
        state.account = null;
        Cookies.remove(settings.cookies.sessionCookieName);
        Cookies.remove(settings.cookies.tokenCookieName);
        next({ name: "login" });
      }
    }
  } else if (to.meta?.anonymous) {
    const session = Cookies.get(settings.cookies.sessionCookieName);
    if (!!session) {
      next({ name: "account" });
    }
  } else {
    next();
  }
}

export default {
  authorize
}