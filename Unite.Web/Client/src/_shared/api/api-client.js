import axios from 'axios';
import interceptors from './api-client-interceptors';

axios.interceptors.request.use(
    interceptors.beforeEach.onFulfilled, 
    interceptors.beforeEach.onRejected
);

axios.interceptors.response.use(
    interceptors.afterEach.onFulfilled,
    interceptors.afterEach.onRejected
);

class ApiClient {
    async get(url) {
        try {
            var response = await axios.get(url);
            return response.data;
        }
        catch (error) {
            throw error.response;
        }
    }

    async post(url, body) {
        try {
            var response = await axios.post(url, body);
            return response.data;
        }
        catch (error) {
            throw error.response;
        }
    }

    async put(url, body) {
        try {
            var response = await axios.put(url, body);
            return response.data;
        }
        catch (error) {
            throw error.response;
        }
    }
}

export default ApiClient;