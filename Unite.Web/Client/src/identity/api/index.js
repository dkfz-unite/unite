import settings from "@/settings";
import tokenHelpers from "@/_shared/helpers/token-helpers";
import ApiClient from "@/_shared/api/api-client";

const client = new ApiClient();
const providersUrl = `${settings.urls.identity}/providers`;
const accountUrl = `${settings.urls.identity}/account`;
const identityUrl = `${settings.urls.identity}/realm`;

function getIdentityProvider() {
  const token = tokenHelpers.get();
  return token.data.authmethod;
}

function getIdentityUrl(provider, action) {
  return `${identityUrl}/${provider}/${action}`;
}

export async function getProviders() {
  var url = providersUrl;

  return await client.get(url);
}

export async function getAccount() {
  const url = accountUrl;

  return await client.get(url);
}

export async function createAccount(email, password, passwordRepeat) {
  const url = accountUrl;

  const data = {
    Email: email,
    Password: password,
    PasswordRepeat: passwordRepeat
  };

  return await client.post(url, data);
}

export async function deleteAccount() {
  const url = accountUrl;

  await client.delete(url);
  tokenHelpers.remove();
}

export async function changePassword(oldPassword, newPassword, newPasswordRepeat) {
  const url = `${accountUrl}/password`;

  const data = {
    OldPassword: oldPassword,
    NewPassword: newPassword,
    NewPasswordRepeat: newPasswordRepeat
  };

  return await client.put(url, data);
}

// export async function checkAccess(email) {
//   const provider = getIdentityProvider();
//   const accessUrl = getIdentityUrl(provider, "access");
//   const url = `${accessUrl}?email=${email}`;

//   return await client.get(url);
// }

export async function logIn(email, password, provider) {
  const url = getIdentityUrl(provider, "login");

  const data = {
    Email: email,
    Password: password
  };

  const token = await client.post(url, data);
  tokenHelpers.set(token);
}

export async function logOut() {
  const provider = getIdentityProvider();
  const url = getIdentityUrl(provider, "logout");

  await client.post(url, null);
  tokenHelpers.remove();
}

export default {
  getProviders,
  getAccount,
  createAccount,
  deleteAccount,
  changePassword,
  logIn,
  logOut
}
