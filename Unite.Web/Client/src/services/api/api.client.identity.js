import settings from '@/settings.js';
import apiClient from "./api.client.js";

class IdentityApiClient {
    #signUpUrl = settings.baseUrl + "/identity/signup";
    #signInUrl = settings.baseUrl + "/identity/signin";
    #signOutUrl = settings.baseUrl + "/identity/signout";
    #accountUrl = settings.baseUrl + "/identity/account";
    #accessibilityUrl = settings.baseUrl + "/accessibility";

    async signUp(email, password, passwordRepeat) {
        var url = this.#signUpUrl;

        var data = {
            Email: email,
            Password: password,
            PasswordRepeat: passwordRepeat
        };

        return await apiClient.post(url, data);
    }

    async signIn(email, password) {
        var url = this.#signInUrl;

        var data = {
            Email: email,
            Password: password
        };

        return await apiClient.post(url, data);
    }

    async signOut() {
        var url = this.#signOutUrl;

        return await apiClient.post(url, null);
    }

    async getAccount() {
        var url = this.#accountUrl;

        return await apiClient.get(url);
    }

    async changePassword(oldPassword, newPassword, newPasswordRepeat) {
        var url = this.#accountUrl;

        var data = {
            OldPassword: oldPassword,
            NewPassword: newPassword,
            NewPasswordRepeat: newPasswordRepeat
        };

        return await apiClient.put(url, data);
    }

    async checkAccess(email) {
        var url = this.#accessibilityUrl + "?email=" + email;

        return await apiClient.get(url);
    }
}

export default new IdentityApiClient();