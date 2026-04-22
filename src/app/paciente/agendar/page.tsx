import HorarioSelector from "../../../components/citas/HorarioSelector";
import styles from "./page.module.css";

export default function AgendarCitaPage() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Agendar Nueva Cita</h1>
      <HorarioSelector />
    </div>
  );
}