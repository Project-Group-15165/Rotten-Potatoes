import axios from 'axios';

// Base URL for the API
const BASE_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance for public routes
const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create an Axios instance for authorized routes
const authorizedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to the authorized instance to include the authorization token
authorizedApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally for both instances
const handleResponseError = (error) => {
  if (error.response && error.response.status === 401) {
    // Handle unauthorized errors (e.g., redirect to login)
    console.error('Unauthorized access - redirecting to login');
    // Optionally, you can redirect to the login page or show a message
  }
  return Promise.reject(error);
};

publicApi.interceptors.response.use(
  (response) => response,
  handleResponseError
);

authorizedApi.interceptors.response.use(
  (response) => response,
  handleResponseError
);

export { publicApi, authorizedApi };