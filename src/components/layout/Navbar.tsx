import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          AgenSoft 🩺
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/paciente/agendar">Agendar Cita</Link>
        </li>
        <li>
          <Link href="/admin">Panel Admin</Link>
        </li>
      </ul>
    </nav>
  );
}