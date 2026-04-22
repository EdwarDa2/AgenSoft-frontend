import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.hero}>
        <h1 className={styles.title}>
          Bienvenido a <span className={styles.highlight}>AgenSoft</span>
        </h1>
        <p className={styles.description}>
          El sistema inteligente para la gestión de citas médicas y control de agendas. 
          Rápido, seguro y siempre sincronizado.
        </p>

        <div className={styles.actions}>
          <Link href="/paciente/agendar" className={styles.primaryButton}>
            Agendar una Cita
          </Link>
          <Link href="/admin" className={styles.secondaryButton}>
            Acceso Administrativo
          </Link>
        </div>
      </main>

      <section className={styles.features}>
        <div className={styles.card}>
          <h3>🩺 Para Pacientes</h3>
          <p>Encuentra horarios disponibles en tiempo real y reserva tu lugar en segundos.</p>
        </div>
        <div className={styles.card}>
          <h3>⚙️ Para Administradores</h3>
          <p>Gestiona bloques de calendario, recorre citas y mantén el control total del consultorio.</p>
        </div>
      </section>
    </div>
  );
}