// frontend/src/services/paciente.service.ts
import api from '../api/axios';

export const pacienteService = {
  obtenerPorUsuario: async (usuarioId: number) => {
    const response = await api.get(`/pacientes/usuario/${usuarioId}`);
    return response.data;
  },

  crear: async (datos: any) => {
    const response = await api.post('/pacientes', datos);
    return response.data;
  },

  actualizar: async (id: number, datos: any) => {
    const response = await api.patch(`/pacientes/${id}`, datos);
    return response.data;
  }
};
