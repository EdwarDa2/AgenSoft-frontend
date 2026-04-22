"use client";

import { useState } from "react";
import styles from "./ModalRecorrer.module.css";

// Definimos qué "props" (parámetros) necesita este componente para funcionar
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (nuevaFecha: string, nuevaHora: string) => void;
  pacienteNombre: string;
}

export default function ModalRecorrer({ isOpen, onClose, onConfirm, pacienteNombre }: ModalProps) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  // Si no está abierto, no renderizamos nada (invisible)
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fecha && hora) {
      onConfirm(fecha, hora);
      // Limpiamos los campos para la próxima vez
      setFecha("");
      setHora("");
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
              min={new Date().toISOString().split('T')[0]} // No permite fechas en el pasado
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label>Nueva Hora</label>
            <select 
              className={styles.input}
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            >
              <option value="">Selecciona una hora</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="03:00 PM">03:00 PM</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={`${styles.btn} ${styles.btnConfirm}`}>
              Confirmar Cambio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}