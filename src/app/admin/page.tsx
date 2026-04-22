"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; 
import CitasTable from "../../components/admin/CitasTable";
import styles from "./page.module.css";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ citasHoy: 0, pendientes: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/citas/stats');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Panel de Control ⚙️</h1>
        <div className={styles.stats}>
          <Link href="/admin/horarios" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#333', color: 'white', borderRadius: '8px', fontWeight: 'bold' }}>
            Configurar Horarios
          </Link>
          <div className={styles.statCard}>
            <h4>Citas Hoy</h4>
            <p>{stats.citasHoy}</p>
          </div>
          <div className={styles.statCard}>
            <h4>Pendientes</h4>
            <p>{stats.pendientes}</p>
          </div>
        </div>
      </div>

      <p>Gestiona los horarios, confirma citas o recórrelas según la disponibilidad.</p>
      <CitasTable />
    </div>
  );
}