"use client";

import { useState } from "react";
import styles from "./ListaCitasPaciente.module.css";

// Mocks extendidos para probar filtros
const MIS_CITAS_MOCK = [
  { id: 1, fecha: "2026-04-25", hora: "09:00 AM", doctor: "Dr. Simi", estado: "Confirmada" },
  { id: 2, fecha: "2026-05-01", hora: "11:30 AM", doctor: "Dra. García", estado: "Pendiente" },
  { id: 3, fecha: "2026-03-15", hora: "10:00 AM", doctor: "Dr. Simi", estado: "Completada" },
  { id: 4, fecha: "2026-02-10", hora: "04:00 PM", doctor: "Dra. García", estado: "Cancelada" },
];

export default function ListaCitasPaciente() {
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const citasFiltradas = MIS_CITAS_MOCK.filter(cita => {
    const coincideEstado = filtroEstado === "todos" || cita.estado.toLowerCase() === filtroEstado.toLowerCase();
    const coincideBusqueda = cita.doctor.toLowerCase().includes(busqueda.toLowerCase()) || 
                            cita.id.toString().includes(busqueda);
    return coincideEstado && coincideBusqueda;
  });

  return (
    <div className={styles.container}>
      {/* Filtros */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Buscar por Doctor o ID</label>
          <input 
            type="text" 
            placeholder="Ej: Simi..." 
            className={styles.searchInput}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Estado de la Cita</label>
          <select 
            className={styles.select}
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </div>

      {/* Grid de Citas */}
      <div className={styles.grid}>
        {citasFiltradas.length > 0 ? (
          citasFiltradas.map((cita) => {
            const estadoLower = cita.estado.toLowerCase();
            const estadoClass = styles[estadoLower] || '';

            return (
              <div key={cita.id} className={styles.citaCard}>
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
          })
        ) : (
          <div className={styles.noData}>
            <p>No se encontraron citas con los filtros seleccionados. 🔍</p>
          </div>
        )}
      </div>
    </div>
  );
}
