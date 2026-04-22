import CitasTable from "../../components/admin/CitasTable";
import styles from "./page.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Panel de Control ⚙️</h1>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h4>Citas Hoy</h4>
            <p>12</p>
          </div>
          <div className={styles.statCard}>
            <h4>Pendientes</h4>
            <p>2</p>
          </div>
        </div>
      </div>

      <p>Gestiona los horarios, confirma citas o recórrelas según la disponibilidad.</p>

      <CitasTable />
    </div>
  );
}