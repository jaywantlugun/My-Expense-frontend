import axios from 'axios';
import { apiRequest } from '../config/apiClient';

export const login = async (loginData: Record<string, any>) => {
  try {
    return await apiRequest({
      endpoint: '/login',
      method: 'POST',
      data: loginData,
    });
  } catch (error) {
    handleApiError(error);
  }
};

export const getCsrfToken = async () => {
  try {
    return await apiRequest({ endpoint: '/api/csrf-token', method: 'GET' });
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
  throw new Error('An unexpected error occurred');
};
