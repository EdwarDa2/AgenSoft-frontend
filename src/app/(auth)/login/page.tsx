"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Intentando iniciar sesión con: ${correo}\n(Falta conectar con la API de Carlos)`);
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