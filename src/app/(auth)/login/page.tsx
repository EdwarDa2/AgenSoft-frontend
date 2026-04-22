"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from "../../../context/AuthContext"; // Importar el hook
import { useRouter } from "next/navigation"; // Para redireccionar

  export default function LoginPage() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    
    const { login } = useAuth(); // Traer la función login
    const router = useRouter();  // Traer el router

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Simulamos que el backend nos respondió "Todo OK, es el paciente Cesar"
      login("Cesar", "paciente"); 
      
      // Lo mandamos al calendario directamente
      router.push("/paciente/agendar"); 
    };
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Ingresa a tu portal de AgenSoft</p>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="juan@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required 
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
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Ingresar
          </button>
        </form>

        <div className={styles.toggleAuth}>
          ¿No tienes cuenta? <Link href="/registro">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}