import axios from 'axios';

const API_BASE_URL = 'https://api.circular.estate';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

export const initializeAuth = async () => ({ accessToken: null });
export const clearAuthTokens = async () => null;

export default apiClient;
