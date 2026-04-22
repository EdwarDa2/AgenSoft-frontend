"use client";

import { useState, useEffect } from "react";
import styles from "./ModalRecorrer.module.css";
import api from "../../api/axios";

interface Bloque {
  id: number;
  hora_inicio: string;
  hora_fin: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bloqueId: number, fecha: string, hora: string) => void;
  pacienteNombre: string;
}

export default function ModalRecorrer({ isOpen, onClose, onConfirm, pacienteNombre }: ModalProps) {
  const [fecha, setFecha] = useState("");
  const [bloques, setBloques] = useState<Bloque[]>([]);
  const [bloqueSeleccionado, setBloqueSeleccionado] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fecha) {
      const fetchBloques = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/bloques/fecha/${fecha}`);
          if (response.data.success) {
            setBloques(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching blocks:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBloques();
    } else {
      setBloques([]);
    }
    setBloqueSeleccionado("");
  }, [fecha]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fecha && bloqueSeleccionado) {
      const bloque = bloques.find(b => b.id === Number(bloqueSeleccionado));
      if (bloque) {
        onConfirm(Number(bloqueSeleccionado), fecha, bloque.hora_inicio);
        setFecha("");
        setBloqueSeleccionado("");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Recorrer Cita</h3>
        <p className={styles.subtitle}>Selecciona el nuevo horario para <strong>{pacienteNombre}</strong>.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nueva Fecha</label>
            <input 
              type="date" 
              className={styles.input}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label>Nueva Hora (Bloques Disponibles)</label>
            <select 
              className={styles.input}
              value={bloqueSeleccionado}
              onChange={(e) => setBloqueSeleccionado(e.target.value === "" ? "" : Number(e.target.value))}
              required
              disabled={loading || !fecha}
            >
              <option value="">{loading ? "Cargando..." : (fecha ? "Selecciona un bloque" : "Primero elige una fecha")}</option>
              {bloques.map(b => (
                <option key={b.id} value={b.id}>
                  {b.hora_inicio.substring(0, 5)} - {b.hora_fin.substring(0, 5)}
                </option>
              ))}
              {!loading && fecha && bloques.length === 0 && (
                <option disabled>No hay bloques disponibles</option>
              )}
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={`${styles.btn} ${styles.btnConfirm}`} disabled={!bloqueSeleccionado}>
              Confirmar Cambio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
