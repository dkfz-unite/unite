import settings from '../../settings';
import ApiClient from "../../_shared/api/api-client";

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

  return await client.post(url, data);
}

async function signOut() {
  var url = signOutUrl;

  return await client.post(url, null);
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

// class IdentityApiClient {
//   #client = new ApiClient();
//   #signUpUrl = settings.baseUrl + "/identity/signup";
//   #signInUrl = settings.baseUrl + "/identity/signin";
//   #signOutUrl = settings.baseUrl + "/identity/signout";
//   #accountUrl = settings.baseUrl + "/identity/account";
//   #accessibilityUrl = settings.baseUrl + "/accessibility";

//   async signUp(email, password, passwordRepeat) {
//     var url = this.#signUpUrl;

//     var data = {
//       Email: email,
//       Password: password,
//       PasswordRepeat: passwordRepeat
//     };

//     return await this.#client.post(url, data);
//   }

//   async signIn(email, password) {
//     var url = this.#signInUrl;

//     var data = {
//       Email: email,
//       Password: password
//     };

//     return await this.#client.post(url, data);
//   }

//   async signOut() {
//     var url = this.#signOutUrl;

//     return await this.#client.post(url, null);
//   }

//   async getAccount() {
//     var url = this.#accountUrl;

//     return await this.#client.get(url);
//   }

//   async changePassword(oldPassword, newPassword, newPasswordRepeat) {
//     var url = this.#accountUrl;

//     var data = {
//       OldPassword: oldPassword,
//       NewPassword: newPassword,
//       NewPasswordRepeat: newPasswordRepeat
//     };

//     return await this.#client.put(url, data);
//   }

//   async checkAccess(email) {
//     var url = this.#accessibilityUrl + "?email=" + email;

//     return await this.#client.get(url);
//   }
// }

// export default IdentityApiClient;