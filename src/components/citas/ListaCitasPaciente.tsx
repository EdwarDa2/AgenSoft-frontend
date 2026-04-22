"use client";

import styles from "./ListaCitasPaciente.module.css";

// Mocks para simular lo que el paciente vería
const MIS_CITAS_MOCK = [
  { id: 1, fecha: "2026-04-25", hora: "09:00 AM", doctor: "Dr. Simi", estado: "Confirmada" },
  { id: 2, fecha: "2026-05-01", hora: "11:30 AM", doctor: "Dra. García", estado: "Pendiente" },
];

export default function ListaCitasPaciente() {
  return (
    <div className={styles.container}>
      {MIS_CITAS_MOCK.map((cita) => {
        // Obtenemos el nombre de la clase de estado dinámicamente
        const estadoLower = cita.estado.toLowerCase();
        const estadoClass = styles[estadoLower] || '';

        return (
          <div key={cita.id} className={styles.citaCard}>
            {/* Barra lateral de color según el estado */}
            <div className={`${styles.estadoIndicator} ${estadoClass}`} />
            
            <div className={styles.info}>
              <h3>Cita #{cita.id}</h3>
              <p>📅 <strong>Fecha:</strong> {cita.fecha}</p>
              <p>⏰ <strong>Hora:</strong> {cita.hora}</p>
              <p>🩺 <strong>Especialista:</strong> {cita.doctor}</p>
              
              <span className={`${styles.statusBadge} ${estadoClass}`}>
                {cita.estado}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
