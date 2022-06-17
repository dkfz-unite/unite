import settings from '../../settings';
import ApiClient from "../../_shared/api/api-client";
import tokenHelpers from "@/_shared/helpers/token-helpers";

const client = new ApiClient();
const signUpUrl = `${settings.baseUrl}/identity/signup`;
const signInUrl = `${settings.baseUrl}/identity/signin`;
const signOutUrl = `${settings.baseUrl}/identity/signout`;
const accountUrl = `${settings.baseUrl}/identity/account`;
const accessibilityUrl = `${settings.baseUrl}/accessibility`;

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
