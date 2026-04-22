// frontend/src/types/index.ts

export interface Bloque {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado_id: number;
}

export interface Cita {
  id: number;
  paciente_id: number;
  bloque_id: number;
  motivo_consulta: string;
  estado_id: number;
  bloque?: Bloque;
  paciente?: {
    nombre_completo: string;
    telefono?: string;
  };
}

export interface HorarioBase {
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  es_laboral: boolean;
}
