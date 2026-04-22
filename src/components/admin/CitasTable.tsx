"use client";

import { useState, useEffect } from 'react';
import styles from './CitasTable.module.css';
import ModalRecorrer from './ModalRecorrer';
import api from '../../api/axios';

interface Cita {
  id_cita: number;
  paciente: string;
  fecha: string;
  hora_inicio: string;
  estado: string;
}

export default function CitasTable() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<{id: number, paciente: string} | null>(null);

  const fetchCitas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/citas/pendientes');
      if (response.data.success) {
        setCitas(response.data.data);
      }
    } catch (err: any) {
      setError("Error al cargar las citas pendientes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  const cambiarEstado = async (id: number, aceptar: boolean) => {
    try {
      const response = await api.patch(`/citas/${id}/responder`, { aceptar });
      if (response.data.success) {
        // Recargar la lista después de responder
        fetchCitas();
        alert(aceptar ? "Cita confirmada" : "Cita rechazada");
      }
    } catch (err: any) {
      alert("Error al procesar la cita");
      console.error(err);
    }
  };

  const abrirModalRecorrer = (id: number, paciente: string) => {
    setCitaSeleccionada({ id, paciente });
    setModalAbierto(true);
  };

  const confirmarRecorrido = async (bloqueId: number, nuevaFecha: string, nuevaHora: string) => {
    if (citaSeleccionada) {
      try {
        setLoading(true);
        const response = await api.patch(`/citas/${citaSeleccionada.id}/reprogramar`, {
          nuevo_bloque_id: bloqueId
        });
        
        if (response.data.success) {
          alert(`Cita de ${citaSeleccionada.paciente} recorrida exitosamente al ${nuevaFecha} a las ${nuevaHora}`);
          setModalAbierto(false);
          fetchCitas();
        }
      } catch (err: any) {
        alert(err.response?.data?.message || "Error al reprogramar la cita");
      } finally {
        setLoading(false);
      }
    }
  };

  const getBadgeClass = (estado: string) => {
    switch (estado) {
      case 'Pendiente': return styles.badgePendiente;
      case 'Confirmada': return styles.badgeConfirmada;
      case 'Rechazada': return styles.badgeCancelada;
      case 'Cancelada': return styles.badgeCancelada;
      case 'Recorrida': return styles.badgeRecorrida;
      default: return '';
    }
  };

  if (loading) return <p>Cargando citas...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

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
          {citas.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                No hay citas pendientes por revisar.
              </td>
            </tr>
          ) : (
            citas.map((cita) => (
              <tr key={cita.id_cita}>
                <td>#{cita.id_cita}</td>
                <td>{cita.paciente}</td>
                <td>{cita.fecha}</td>
                <td>{cita.hora_inicio}</td>
                <td>
                  <span className={`${styles.badge} ${getBadgeClass(cita.estado)}`}>
                    {cita.estado}
                  </span>
                </td>
                <td className={styles.actions}>
                  {cita.estado === 'Pendiente' && (
                    <>
                      <button onClick={() => cambiarEstado(cita.id_cita, true)} className={`${styles.btn} ${styles.btnConfirmar}`}>
                        Confirmar
                      </button>
                      <button onClick={() => cambiarEstado(cita.id_cita, false)} className={`${styles.btn} ${styles.btnCancelar}`}>
                        Rechazar
                      </button>
                    </>
                  )}
                  {cita.estado !== 'Cancelada' && cita.estado !== 'Rechazada' && (
                    <button onClick={() => abrirModalRecorrer(cita.id_cita, cita.paciente)} className={`${styles.btn} ${styles.btnRecorrer}`}>
                      Recorrer
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalAbierto && citaSeleccionada && (
        <ModalRecorrer 
          paciente={citaSeleccionada.paciente}
          onClose={() => setModalAbierto(false)}
          onConfirm={confirmarRecorrido}
        />
      )}
    </div>
  );