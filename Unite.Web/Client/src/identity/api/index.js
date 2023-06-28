import settings from '@/settings';
import ApiClient from "@/_shared/api/api-client";
import tokenHelpers from "@/_shared/helpers/token-helpers";

const client = new ApiClient();
const signUpUrl = `${settings.urls.identity}/api/default/register`;
const signInUrl = (providerCode) => `${settings.urls.identity}/api/${providerCode}/login`;
const signOutUrl = (providerCode) => `${settings.urls.identity}/api/${providerCode}/logout`;
const changePasswordUrl = `${settings.urls.identity}/api/default/password`
const accountUrl = `${settings.urls.identity}/api/account`;
const accessibilityUrl = `${settings.urls.identity}/api/access`;
const providersUrl = `${settings.urls.identity}/api/settings/providers`;

async function signUp(email, password, passwordRepeat) {
  var url = signUpUrl;

  var data = {
    Email: email,
    Password: password,
    PasswordRepeat: passwordRepeat
  };

  return await client.post(url, data);
}

async function signIn(email, password, providerCode) {
  var url = signInUrl(providerCode);

  var data = {
    Email: email,
    Password: password
  };

  var token = await client.post(url, data);
  tokenHelpers.set(token);
}

async function signOut(providerCode) {
  var url = signOutUrl(providerCode);

  await client.post(url, null);
  tokenHelpers.remove();
}

async function getAccount() {
  var url = accountUrl;

  return await client.get(url);
}

async function changePassword(oldPassword, newPassword, newPasswordRepeat) {
  var url = changePasswordUrl;

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

async function getProviders() {
  var url = providersUrl;

  return await client.get(url);
}

export default {
  signUp,
  signIn,
  signOut,
  getAccount,
  changePassword,
  checkAccess,
  getProviders,
}
