// frontend/src/services/admin.service.ts
import api from '../api/axios';

export const adminService = {
  obtenerCitas: async (params?: any) => {
    const response = await api.get('/admin/citas', { params });
    return response.data;
  },

  recorrerCitas: async (datos: { fecha: string, minutos: number }) => {
    const response = await api.post('/admin/recorrer-citas', datos);
    return response.data;
  },

  confirmarCita: async (id: number) => {
    const response = await api.patch(`/admin/citas/${id}/confirmar`);
    return response.data;
  }
};
