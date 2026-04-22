import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api', // Ajusta el puerto si tu backend usa otro
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token en el futuro
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
