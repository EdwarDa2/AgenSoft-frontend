// frontend/src/services/cita.service.ts
import api from '../api/axios';

export const citaService = {
  solicitar: async (datos: {
    paciente_id: number;
    bloque_id: number;
    motivo_consulta: string;
  }) => {
    const response = await api.post('/citas/solicitar', datos);
    return response.data;
  },

  obtenerMisCitas: async () => {
    const response = await api.get('/citas/mis-citas');
    return response.data;
  },

  obtenerPorPaciente: async (pacienteId: number) => {
    const response = await api.get(`/citas/paciente/${pacienteId}`);
    return response.data;
  },

  cancelar: async (id: number, pacienteId?: number) => {
    const response = await api.patch(`/citas/${id}/cancelar`, { paciente_id: pacienteId });
    return response.data;
  },

  obtenerPendientes: async () => {
    const response = await api.get('/citas/pendientes');
    return response.data;
  },

  obtenerHistorial: async () => {
    const response = await api.get('/citas/historial');
    return response.data;
  },

  responder: async (id: number, aceptar: boolean) => {
    const response = await api.patch(`/citas/${id}/responder`, { aceptar });
    return response.data;
  },

  reprogramar: async (id: number, nuevoBloqueId: number) => {
    const response = await api.patch(`/citas/${id}/reprogramar`, { nuevo_bloque_id: nuevoBloqueId });
    return response.data;
  },

  obtenerStats: async () => {
    const response = await api.get('/citas/stats');
    return response.data;
  }
};
