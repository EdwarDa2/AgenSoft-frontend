"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "../../../services/auth.service";
import styles from "./page.module.css";
import { toast } from 'react-hot-toast';

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rolId, setRolId] = useState(2); // 2 por defecto es Paciente
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await authService.registro({
        nombre,
        email: correo,
        password,
        rol_id: rolId
      });

      if (data.success) {
        toast.success("¡Registro exitoso! Ahora puedes iniciar sesión.");
        router.push("/login");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al registrar usuario";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        <p className={styles.subtitle}>Únete a AgenSoft para agendar tus citas</p>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleRegistro}>
          <div className={styles.formGroup}>
            <label>Tipo de Usuario</label>
            <div className={styles.roleSelector}>
              <div 
                className={`${styles.roleOption} ${rolId === 2 ? styles.roleOptionActive : ''}`}
                onClick={() => setRolId(2)}
              >
                Paciente
              </div>
              <div 
                className={`${styles.roleOption} ${rolId === 1 ? styles.roleOptionActive : ''}`}
                onClick={() => setRolId(1)}
              >
                Administrador
              </div>
            </div>
          </div>

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

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <div className={styles.toggleAuth}>
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
}