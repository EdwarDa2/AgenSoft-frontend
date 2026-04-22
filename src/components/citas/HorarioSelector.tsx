"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HorarioSelector.module.css';

const HORARIOS_DISPONIBLES = [
  "09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM",
  "12:30 PM", "02:00 PM", "03:30 PM", "04:00 PM"
];

export default function HorarioSelector() {
  const router = useRouter();
  const [fecha, setFecha] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);

  const handleConfirmar = () => {
    // Redirigir a la página de éxito con los datos en la URL
    router.push(`/paciente/agendar/exito?fecha=${fecha}&hora=${horaSeleccionada}`);
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
        onChange={(e) => setFecha(e.target.value)}
        min={new Date().toISOString().split('T')[0]} // No permite fechas pasadas
      />

      {fecha && (
        <>
          <div className={styles.grid}>
            {HORARIOS_DISPONIBLES.map((hora) => (
              <button
                key={hora}
                className={`${styles.timeSlot} ${horaSeleccionada === hora ? styles.selected : ''}`}
                onClick={() => setHoraSeleccionada(hora)}
              >
                {hora}
              </button>
            ))}
          </div>

          <button 
            className={styles.confirmBtn}
            disabled={!horaSeleccionada}
            onClick={handleConfirmar}
          >
            Confirmar Cita
          </button>
        </>
      )}
    </div>
  );
}