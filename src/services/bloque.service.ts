// frontend/src/services/bloque.service.ts
import api from '../api/axios';
import { Bloque } from '../types';

export const bloqueService = {
  obtenerPorFecha: async (fecha: string) => {
    const response = await api.get(`/bloques/fecha/${fecha}`);
    return response.data;
  },

  obtenerTodos: async (skip = 0, take = 10) => {
    const response = await api.get(`/bloques?skip=${skip}&take=${take}`);
    return response.data;
  }
};
