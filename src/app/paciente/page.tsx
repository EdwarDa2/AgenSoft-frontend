"use client";

import ListaCitasPaciente from "../../components/citas/ListaCitasPaciente";
import Link from "next/link";
import styles from "./page.module.css";

export default function PacienteDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Mis Citas 🩺</h1>
          <p>Consulta el estado de tus solicitudes.</p>
        </div>
        <Link href="/paciente/agendar" className={styles.agendarBtn}>
          + Agendar Nueva Cita
        </Link>
      </header>

      <ListaCitasPaciente />
    </div>
  );
}
