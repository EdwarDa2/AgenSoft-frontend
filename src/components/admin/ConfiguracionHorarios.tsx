"use client";

import { useState } from "react";
import styles from "./ConfiguracionHorarios.module.css";
import api from "../../api/axios";

const DIAS_MAP: Record<string, number> = {
  "Domingo": 0,
  "Lunes": 1,
  "Martes": 2,
  "Miércoles": 3,
  "Jueves": 4,
  "Viernes": 5,
  "Sábado": 6
};

const HORARIOS_INICIALES = [
  { dia: "Lunes", activo: true, inicio: "09:00", fin: "17:00" },
  { dia: "Martes", activo: true, inicio: "09:00", fin: "17:00" },
  { dia: "Miércoles", activo: true, inicio: "09:00", fin: "17:00" },
  { dia: "Jueves", activo: true, inicio: "09:00", fin: "17:00" },
  { dia: "Viernes", activo: true, inicio: "09:00", fin: "14:00" },
  { dia: "Sábado", activo: false, inicio: "", fin: "" },
  { dia: "Domingo", activo: false, inicio: "", fin: "" },
];

export default function ConfiguracionHorarios() {
  const [horarios, setHorarios] = useState(HORARIOS_INICIALES);
  const [loading, setLoading] = useState(false);
  const [showGenerar, setShowGenerar] = useState(false);
  const [generarData, setGenerarData] = useState({
    inicio: new Date().toISOString().split('T')[0],
    fin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    duracion: 30
  });

  const toggleDia = (index: number) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index].activo = !nuevosHorarios[index].activo;
    if (!nuevosHorarios[index].activo) {
      nuevosHorarios[index].inicio = "";
      nuevosHorarios[index].fin = "";
    } else {
      nuevosHorarios[index].inicio = "09:00";
      nuevosHorarios[index].fin = "17:00";
    }
    setHorarios(nuevosHorarios);
  };

  const cambiarHora = (index: number, campo: "inicio" | "fin", valor: string) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index][campo] = valor;
    setHorarios(nuevosHorarios);
  };

  const handleGuardar = async () => {
    try {
      setLoading(true);
      // Guardar cada día configurado
      for (const h of horarios) {
        await api.post('/horarios/configurar', {
          dia_semana: DIAS_MAP[h.dia],
          hora_inicio: h.inicio || "00:00",
          hora_fin: h.fin || "00:00",
          es_laboral: h.activo
        });
      }
      alert("¡Horarios base guardados exitosamente!");
      setShowGenerar(true);
    } catch (error) {
      console.error(error);
      alert("Error al guardar la configuración");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerarBloques = async () => {
    try {
      setLoading(true);
      const response = await api.post('/horarios/generar', {
        fecha_inicio: generarData.inicio,
        fecha_fin: generarData.fin,
        duracion_minutos: Number(generarData.duracion)
      });
      if (response.data.status === 'success') {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error al generar bloques de tiempo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Configuración de Agenda 📅</h2>
        <p>Define los días y horas en los que estarás disponible para recibir citas.</p>
      </div>

      <div className={styles.horariosList}>
        {horarios.map((horario, index) => (
          <div key={horario.dia} className={styles.dayRow}>
            <div className={styles.dayToggle}>
              <input 
                type="checkbox" 
                className={styles.checkbox}
                checked={horario.activo}
                onChange={() => toggleDia(index)}
              />
              <span className={styles.dayName}>{horario.dia}</span>
            </div>

            <div className={styles.timeInputs}>
              <div className={styles.timeInputGroup}>
                <label>Hora Inicio</label>
                <input 
                  type="time" 
                  className={styles.input}
                  value={horario.inicio}
                  onChange={(e) => cambiarHora(index, "inicio", e.target.value)}
                  disabled={!horario.activo}
                />
              </div>
              <span>-</span>
              <div className={styles.timeInputGroup}>
                <label>Hora Fin</label>
                <input 
                  type="time" 
                  className={styles.input}
                  value={horario.fin}
                  onChange={(e) => cambiarHora(index, "fin", e.target.value)}
                  disabled={!horario.activo}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleGuardar} className={styles.saveBtn} disabled={loading}>
        {loading ? "Guardando..." : "Guardar Configuración"}
      </button>

      {showGenerar && (
        <div className={styles.generarSection} style={{ marginTop: '2rem', padding: '1.5rem', border: '2px solid #e3f2fd', borderRadius: '12px', background: '#f8fbff' }}>
          <h3>Generar Bloques de Tiempo ⚡</h3>
          <p>Crea automáticamente los espacios disponibles basados en tu configuración.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <div className={styles.timeInputGroup}>
              <label>Desde</label>
              <input type="date" value={generarData.inicio} onChange={e => setGenerarData({...generarData, inicio: e.target.value})} className={styles.input} />
            </div>
            <div className={styles.timeInputGroup}>
              <label>Hasta</label>
              <input type="date" value={generarData.fin} onChange={e => setGenerarData({...generarData, fin: e.target.value})} className={styles.input} />
            </div>
            <div className={styles.timeInputGroup}>
              <label>Duración (min)</label>
              <input type="number" value={generarData.duracion} onChange={e => setGenerarData({...generarData, duracion: Number(e.target.value)})} className={styles.input} />
            </div>
          </div>
          <button onClick={handleGenerarBloques} className={styles.saveBtn} style={{ marginTop: '1rem', backgroundColor: '#1e88e5' }} disabled={loading}>
            {loading ? "Generando..." : "Generar Espacios en la Agenda"}
          </button>
        </div>
      )}
    </div>
  );
}