"use client";
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth(); 
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          AgenSoft 🩺
        </Link>
      </div>
      <ul className={styles.navLinks}>        
        {user && user.rol === 'paciente' && (
          <li>
            <Link href="/paciente">Mis Citas</Link>
          </li>
        )}

        {user?.rol === 'paciente' && (
          <li>
            <Link href="/paciente/perfil">Mi Perfil</Link>
          </li>
        )}

        {user?.rol === 'admin' && (
          <li>
            <Link href="/admin">Panel Admin</Link>
          </li>
        )}

        {!user ? (
          <li>
            <Link href="/login" style={{ color: '#1e88e5', fontWeight: 'bold' }}>
              Iniciar Sesión
            </Link>
          </li>
        ) : (
          <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: '#666' }}>Hola, <strong>{user.nombre}</strong></span>
            <button 
              onClick={handleLogout} 
              style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Salir
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}