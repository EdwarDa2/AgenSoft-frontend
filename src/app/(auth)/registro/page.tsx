"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoPaciente = {
      nombre,
      telefono,
      correo,
      password
    };
    
    console.log("Datos a enviar a la API:", nuevoPaciente);
    alert(`¡Gracias por registrarte, ${nombre}!\n(Falta conectar con la API de Carlos)`);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        <p className={styles.subtitle}>Únete a AgenSoft para agendar tus citas</p>

        <form onSubmit={handleRegistro}>
          <div className={styles.formGroup}>
            <label>Nombre Completo</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono Celular</label>
            <input 
              type="tel" 
              className={styles.input} 
              placeholder="10 dígitos"
              pattern="[0-9]{10}"
              title="Por favor ingresa un número de 10 dígitos"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required 
            />
          </div>

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
              placeholder="Crea una contraseña segura"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Registrarme
          </button>
        </form>

        <div className={styles.toggleAuth}>
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
}