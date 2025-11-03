import axios, { AxiosRequestConfig } from "axios";
import interceptors from "./api-client-interceptors";

axios.interceptors.request.use(
  interceptors.beforeEach.onFulfilled as any,
  interceptors.beforeEach.onRejected as any
);

axios.interceptors.response.use(
  interceptors.afterEach.onFulfilled as any,
  interceptors.afterEach.onRejected as any
);

class ApiClient {
  async get(url: string, config: any | null = null): Promise<any> {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      throw error?.response;
    }
  }

  async post(url: string, body: any, config: any | null = null): Promise<any> {
    try {
      const response = await axios.post(url, body, config);
      return response.data;
    } catch (error: any) {
      throw error?.response;
    }
  }

  async put(url: string, body: any, config: any | null = null): Promise<any> {
    try {
      const response = await axios.put(url, body, config);
      return response.data;
    } catch (error: any) {
      throw error?.response;
    }
  }

  async delete(url: string, config: any | null = null): Promise<any> {
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error: any) {
      throw error?.response;
    }
  }
}

export default ApiClient;
