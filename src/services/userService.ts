import axios from 'axios';
import { apiRequest } from '../config/apiClient';

export const getUserInfo = async () => {
  try {
    return await apiRequest({ endpoint: '/auth/me', method: 'GET' });
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
