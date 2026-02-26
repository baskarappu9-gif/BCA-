import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || (error.response?.data?.error) || error.message || 'An error occurred';
    console.error('API Error Details:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(new Error(errorMessage));
  }
);

// API functions

// Predict property price
// Predict property price
export const predictPrice = async (propertyData) => {
  try {
    // Direct call to ML service on port 8000
    const response = await apiClient.post('http://localhost:8000/predict', propertyData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get trending cities
export const getTrendingCities = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.TRENDING_CITIES);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get area analysis
export const getAreaAnalysis = async (city) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.AREA_ANALYSIS}?city=${city}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get price trends
export const getPriceTrends = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await apiClient.get(`${API_ENDPOINTS.PRICE_TRENDS}?${queryString}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Compare properties
export const compareProperties = async (propertyIds) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.COMPARE, { propertyIds });
    return response;
  } catch (error) {
    throw error;
  }
};

// Get all properties
export const getProperties = async (filters = {}) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`${API_ENDPOINTS.PROPERTIES}?${queryString}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Search properties
export const searchProperties = async (query) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Upload CSV file
export const uploadCSV = async (file, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append('csv', file);

    const response = await apiClient.post(API_ENDPOINTS.UPLOAD_CSV, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(percentCompleted);
        }
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

// Upload images
export const uploadImages = async (files, onUploadProgress) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const response = await apiClient.post(API_ENDPOINTS.UPLOAD_IMAGES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(percentCompleted);
        }
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
