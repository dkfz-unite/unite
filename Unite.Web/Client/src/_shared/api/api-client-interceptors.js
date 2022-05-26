import axios from "axios";
import tokens from "./api-client-token";

const loginPageUrl = 'login';
const accountPageUrl = 'account';

export const beforeEach = {
    onFulfilled: async (request) => {
        const oldToken = tokens.getToken();
        
        if (oldToken) {
            // Validating new token
            if (oldToken.valid) {
                // Using old token value
                request.headers.Authorization = `Bearer ${oldToken.value}`;
            } else {
                // Refreshing token
                localStorage.removeItem('token');
                const newToken = await tokens.refreshToken(oldToken);
                
                // Using new token
                if (newToken) {
                    localStorage.setItem('token', newToken.value);
                    request.headers.Authorization = `Bearer ${newToken.value}`;
                }
            }
        }

        return Promise.resolve(request);
    },
    onRejected: async (error) => {
        return Promise.reject(error);
    }
}

export const afterEach = {
    onFulfilled: async (response) => {
        return Promise.resolve(response);
    },
    onRejected: async (error) => {
        const request = error.config;
        const response = error.response;

        if (response?.status == 401) {
            window.location.assign(loginPageUrl);
        } else if (response?.status == 403) {
            window.location.assign(accountPageUrl);
        }

        return Promise.reject(error);
    }
}

export default {
    beforeEach,
    afterEach
}
