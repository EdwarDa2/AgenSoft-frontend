"use client";

import { useState, useEffect } from "react";
import styles from "./ListaCitasPaciente.module.css";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

interface Cita {
  id_cita: number;
  fecha: string;
  hora_inicio: string;
  estado: string;
}

export default function ListaCitasPaciente() {
  const { user } = useAuth();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchCitas = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/citas/paciente/${user.id}`);
        if (response.data.success) {
          setCitas(response.data.data);
        }
      } catch (err: any) {
        setError("Error al cargar tus citas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [user?.id]);

  const citasFiltradas = citas.filter(cita => {
    const coincideEstado = filtroEstado === "todos" || cita.estado.toLowerCase() === filtroEstado.toLowerCase();
    const coincideBusqueda = cita.id_cita.toString().includes(busqueda);
    return coincideEstado && coincideBusqueda;
  });

  if (loading) return <p className={styles.loading}>Cargando tus citas...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      {/* Filtros */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Buscar por ID</label>
          <input 
            type="text" 
            placeholder="Ej: 1..." 
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
              <div key={cita.id_cita} className={styles.citaCard}>
                <div className={`${styles.estadoIndicator} ${estadoClass}`} />
                
                <div className={styles.info}>
                  <h3>Cita #{cita.id_cita}</h3>
                  <p>📅 <strong>Fecha:</strong> {cita.fecha}</p>
                  <p>⏰ <strong>Hora:</strong> {cita.hora_inicio}</p>
                  
                  <span className={`${styles.statusBadge} ${estadoClass}`}>
                    {cita.estado}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noData}>
            <p>No se encontraron citas. 🔍</p>
          </div>
        )}
      </div>
    </div>
  );
}
