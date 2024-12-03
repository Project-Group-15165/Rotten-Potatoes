import { authorizedApi, publicApi } from './api';

export const login = async (username, password) => {
  const response = await publicApi.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await publicApi.post('/auth/register', userData);
  return response.status;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await authorizedApi.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};