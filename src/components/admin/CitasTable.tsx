"use client";

import { useState, useEffect } from 'react';
import styles from './CitasTable.module.css';
import ModalRecorrer from './ModalRecorrer';
import { citaService } from '../../services/cita.service';
import { toast } from 'react-hot-toast';

interface Cita {
  id_cita: number;
  paciente: string;
  fecha: string;
  hora_inicio: string;
  estado: string;
}

interface Props {
  tipo: 'pendientes' | 'historial';
}

export default function CitasTable({ tipo }: Props) {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<{id: number, paciente: string} | null>(null);

  const fetchCitas = async () => {
    try {
      setLoading(true);
      const data = tipo === 'pendientes' 
        ? await citaService.obtenerPendientes() 
        : await citaService.obtenerHistorial();
        
      if (data.success) {
        setCitas(data.data);
      }
    } catch (err: any) {
      setError(`Error al cargar las citas ${tipo}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, [tipo]);

  const cambiarEstado = async (id: number, aceptar: boolean) => {
    // Confirmación simple antes de proceder
    if (!window.confirm(`¿Estás seguro de que deseas ${aceptar ? 'confirmar' : 'rechazar'} esta cita?`)) {
      return;
    }

    try {
      const data = await citaService.responder(id, aceptar);
      if (data.success) {
        fetchCitas();
        toast.success(aceptar ? "Cita confirmada correctamente" : "Cita rechazada");
      }
    } catch (err: any) {
      toast.error("Error al procesar la cita");
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
        const data = await citaService.reprogramar(citaSeleccionada.id, bloqueId);
        
        if (data.success) {
          toast.success(`Cita de ${citaSeleccionada.paciente} recorrida al ${nuevaFecha} ${nuevaHora}`);
          setModalAbierto(false);
          fetchCitas();
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Error al reprogramar la cita");
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

  const SkeletonRows = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} className={styles.skeletonRow}>
          {Array(6).fill(0).map((_, j) => (
            <td key={j}><div className={styles.skeletonText}></div></td>
          ))}
        </tr>
      ))}
    </>
  );

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
          {loading ? (
            <SkeletonRows />
          ) : citas.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                {tipo === 'pendientes' 
                  ? "No hay citas pendientes por revisar." 
                  : "No hay historial de citas para mostrar."}
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
  );} 
