"use client"; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HorarioSelector.module.css';
import { useAuth } from '../../context/AuthContext';
import { bloqueService } from '../../services/bloque.service';
import { citaService } from '../../services/cita.service';
import { Bloque } from '../../types';

export default function HorarioSelector() {
  const router = useRouter();
  const { user } = useAuth();
  const [fecha, setFecha] = useState('');
  const [bloques, setBloques] = useState<Bloque[]>([]);
  const [bloqueSeleccionado, setBloqueSeleccionado] = useState<number | null>(null);
  const [motivo, setMotivo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBloques = async () => {
      if (!fecha) return;
      try {
        setLoading(true);
        const data = await bloqueService.obtenerPorFecha(fecha);
        if (data.success) {
          // Filtrar solo bloques disponibles (estado_id 1)
          setBloques(data.data.filter((b: Bloque) => b.estado_id === 1));
        }
      } catch (err) {
        console.error("Error fetching blocks:", err);
        setError("No se pudieron cargar los horarios para esta fecha.");
      } finally {
        setLoading(false);
      }
    };
    fetchBloques();
  }, [fecha]);

  const handleConfirmar = async () => {
    if (!bloqueSeleccionado || !user?.id) return;

    try {
      setLoading(true);
      const data = await citaService.solicitar({
        paciente_id: user.id,
        bloque_id: bloqueSeleccionado,
        motivo_consulta: motivo || "Consulta general"
      });

      if (data.success) {
        const bloque = bloques.find(b => b.id === bloqueSeleccionado);
        router.push(`/paciente/agendar/exito?fecha=${fecha}&hora=${bloque?.hora_inicio}`);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error al agendar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Selecciona tu Horario</h2>
        <p>Elige la fecha y la hora que mejor te acomode.</p>
      </div>

      <input 
        type="date" 
        className={styles.dateInput}
        value={fecha}
        onChange={(e) => {
          setFecha(e.target.value);
          setBloqueSeleccionado(null);
        }}
        min={new Date().toISOString().split('T')[0]}
      />

      {loading && <p>Cargando horarios...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && fecha && (
        <>
          <div className={styles.grid}>
            {bloques.length > 0 ? (
              bloques.map((bloque) => (
                <button
                  key={bloque.id}
                  className={`${styles.timeSlot} ${bloqueSeleccionado === bloque.id ? styles.selected : ''}`}
                  onClick={() => setBloqueSeleccionado(bloque.id)}
                >
                  {bloque.hora_inicio}
                </button>
              ))
            ) : (
              <p className={styles.noData}>No hay horarios disponibles para esta fecha.</p>
            )}
          </div>

          {bloqueSeleccionado && (
            <div className={styles.motivoSection} style={{ marginTop: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Motivo de la consulta:
              </label>
              <textarea 
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej: Dolor de cabeza, revisión anual..."
              />
            </div>
          )}

          <button 
            className={styles.confirmBtn}
            disabled={!bloqueSeleccionado || loading}
            onClick={handleConfirmar}
          >
            {loading ? "Procesando..." : "Confirmar Cita"}
          </button>
        </>
      )}
    </div>
  );
}