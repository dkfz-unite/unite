import settings from '@/settings';
import ApiClient from "@/_shared/api/api-client";
import tokenHelpers from "@/_shared/helpers/token-helpers";

const client = new ApiClient();
const signUpUrl = `${settings.urls.composer}/api/identity/signup`;
const signInUrl = `${settings.urls.composer}/api/identity/signin`;
const signOutUrl = `${settings.urls.composer}/api/identity/signout`;
const accountUrl = `${settings.urls.composer}/api/identity/account`;
const accessibilityUrl = `${settings.urls.composer}/api/accessibility`;

async function signUp(email, password, passwordRepeat) {
  var url = signUpUrl;

  var data = {
    Email: email,
    Password: password,
    PasswordRepeat: passwordRepeat
  };

  return await client.post(url, data);
}

async function signIn(email, password) {
  var url = signInUrl;

  var data = {
    Email: email,
    Password: password
  };

  var token = await client.post(url, data);
  tokenHelpers.set(token);
}

async function signOut() {
  var url = signOutUrl;

  await client.post(url, null);
  tokenHelpers.remove();
}

async function getAccount() {
  var url = accountUrl;

  return await client.get(url);
}

async function changePassword(oldPassword, newPassword, newPasswordRepeat) {
  var url = accountUrl;

  var data = {
    OldPassword: oldPassword,
    NewPassword: newPassword,
    NewPasswordRepeat: newPasswordRepeat
  };

  return await client.put(url, data);
}

async function checkAccess(email) {
  var url = accessibilityUrl + "?email=" + email;

  return await client.get(url);
}

export default {
  signUp,
  signIn,
  signOut,
  getAccount,
  changePassword,
  checkAccess
}
