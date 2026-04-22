"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import api from "../../../api/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Petición real al backend
      const response = await api.post('/usuarios/login', {
        email,
        password
      });

      // El backend devuelve { success, message, data: { user, token } }
      const { user, token } = response.data.data;
      
      // Guardar en el contexto y localStorage
      login(user, token);
      
      // Redirigir según el rol
      if (user.rol.toLowerCase() === 'admin') {
        router.push("/admin");
      } else {
        router.push("/paciente");
      }
    } catch (err: any) {
      console.error("Error en login:", err);
      setError(
        err.response?.data?.message || 
        "Error al conectar con el servidor. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Ingresa a tu portal de AgenSoft</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="juan@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </form>

        <div className={styles.toggleAuth}>
          ¿No tienes cuenta? <Link href="/registro">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}
