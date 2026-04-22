"use client";

import { useState } from "react";
import styles from "./ConfiguracionHorarios.module.css";

// Simulamos los horarios actuales del doctor
const HORARIOS_INICIALES = [
  { dia: "Lunes", activo: true, inicio: "09:00", fin: "17:00" },
  { dia: "Martes", activo: true, inicio: "09:00", fin: "17:00" },
  { dia: "Miércoles", activo: true, inicio: "09:00", fin: "17:00" },
  { dia: "Jueves", activo: true, inicio: "09:00", fin: "17:00" },
  { dia: "Viernes", activo: true, inicio: "09:00", fin: "14:00" }, // Sale temprano
  { dia: "Sábado", activo: false, inicio: "", fin: "" },
  { dia: "Domingo", activo: false, inicio: "", fin: "" },
];

export default function ConfiguracionHorarios() {
  const [horarios, setHorarios] = useState(HORARIOS_INICIALES);

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

  const handleGuardar = () => {
    console.log("Enviando configuración al Backend:", horarios);
    alert("¡Horarios guardados exitosamente!\nEstos serán los bloques que verán los pacientes.");
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

      <button onClick={handleGuardar} className={styles.saveBtn}>
        Guardar Configuración
      </button>
    </div>
  );
}