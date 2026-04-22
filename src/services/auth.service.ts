// frontend/src/services/auth.service.ts
import api from '../api/axios';

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/usuarios/login', credentials);
    return response.data;
  },
  
  registro: async (userData: any) => {
    const response = await api.post('/usuarios/registrar', userData);
    return response.data;
  },

  getPerfil: async () => {
    const response = await api.get('/usuarios/perfil');
    return response.data;
  }
};
