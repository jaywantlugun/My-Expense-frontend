import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { navigateTo } from '../hooks/navigation/navigation';
import { API_BASE_URL } from './serverApiConfig';

let csrfToken = '';

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Function to fetch CSRF token
export const getCsrfToken = async () => {
  try {
    const response = await apiInstance.get('/api/csrf-token');
    csrfToken = response.data?.token || '';
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

// Request Interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config, withCredentials: true };
    updatedConfig.headers['Content-Type'] = 'application/json';

    // Add CSRF token to the header if available
    if (csrfToken) {
      updatedConfig.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return updatedConfig;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
apiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      navigateTo('/login');
    }
    return Promise.reject(error);
  },
);

// API Request Function
export const apiRequest = async ({
  endpoint,
  method,
  data,
  withCredentials = false,
}: {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  withCredentials?: boolean;
}) => {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    data,
    withCredentials,
  };

  // Ensure CSRF token is fetched before making requests
  if (!csrfToken) {
    await getCsrfToken();
  }

  const response = await apiInstance(config);
  return response.data;
};
