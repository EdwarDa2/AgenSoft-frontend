"use client"; // Es interactivo, así que corre del lado del cliente

import { useState } from 'react';
import styles from './CitasTable.module.css';

// Datos simulados (Mocks)
const MOCK_CITAS = [
  { id: 1, paciente: "Juan Pérez", fecha: "2026-04-25", hora: "09:00 AM", estado: "Pendiente" },
  { id: 2, paciente: "María López", fecha: "2026-04-25", hora: "10:00 AM", estado: "Confirmada" },
  { id: 3, paciente: "Carlos Ruiz", fecha: "2026-04-26", hora: "11:00 AM", estado: "Pendiente" },
];

export default function CitasTable() {
  // Usamos estado para poder modificar la vista cuando des clic a los botones
  const [citas, setCitas] = useState(MOCK_CITAS);

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    setCitas(citas.map(cita => 
      cita.id === id ? { ...cita, estado: nuevoEstado } : cita
    ));
    // Aquí es donde Carlos conectará su endpoint PUT /api/v1/citas/:id
  };

  const getBadgeClass = (estado: string) => {
    switch (estado) {
      case 'Pendiente': return styles.badgePendiente;
      case 'Confirmada': return styles.badgeConfirmada;
      case 'Cancelada': return styles.badgeCancelada;
      case 'Recorrida': return styles.badgeRecorrida;
      default: return '';
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>#{cita.id}</td>
              <td>{cita.paciente}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>
                <span className={`${styles.badge} ${getBadgeClass(cita.estado)}`}>
                  {cita.estado}
                </span>
              </td>
              <td className={styles.actions}>
                {cita.estado === 'Pendiente' && (
                  <button onClick={() => cambiarEstado(cita.id, 'Confirmada')} className={`${styles.btn} ${styles.btnConfirmar}`}>
                    Confirmar
                  </button>
                )}
                {cita.estado !== 'Cancelada' && (
                  <button onClick={() => alert('Aquí abriremos un modal para elegir la nueva hora')} className={`${styles.btn} ${styles.btnRecorrer}`}>
                    Recorrer
                  </button>
                )}
                {cita.estado !== 'Cancelada' && (
                  <button onClick={() => cambiarEstado(cita.id, 'Cancelada')} className={`${styles.btn} ${styles.btnCancelar}`}>
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}