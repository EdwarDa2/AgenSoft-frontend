// frontend/src/services/horario.service.ts
import api from '../api/axios';

export const horarioService = {
  configurarDia: async (datos: {
    dia_semana: number;
    hora_inicio: string;
    hora_fin: string;
    es_laboral: boolean;
  }) => {
    const response = await api.post('/horarios/configurar', datos);
    return response.data;
  },

  generarBloques: async (datos: {
    fecha_inicio: string;
    fecha_fin: string;
    duracion_minutos: number;
  }) => {
    const response = await api.post('/horarios/generar', datos);
    return response.data;
  }
};
