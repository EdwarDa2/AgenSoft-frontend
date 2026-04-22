"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from "../../../context/AuthContext";

export default function PerfilPacientePage() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "Cesar Yair",
    email: user?.email || "cesar@ejemplo.com",
    telefono: "961 123 4567",
    informacionMedica: "Alérgico a la penicilina. Tipo de sangre O+."
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Perfil actualizado con éxito! (Simulado)");
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h1 className={styles.title}>Mi Perfil 👤</h1>
        
        <form onSubmit={handleSave}>
          <div className={styles.formGroup}>
            <label>Nombre Completo</label>
            <input 
              type="text" 
              className={styles.input}
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              className={styles.input}
              value={formData.email}
              disabled
            />
            <small style={{ color: '#888' }}>El correo no se puede cambiar por seguridad.</small>
          </div>

          <div className={styles.formGroup}>
            <label>Teléfono de Contacto</label>
            <input 
              type="tel" 
              className={styles.input}
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Información Médica de Relevancia</label>
            <textarea 
              className={styles.textarea}
              value={formData.informacionMedica}
              onChange={(e) => setFormData({...formData, informacionMedica: e.target.value})}
              placeholder="Alergias, condiciones crónicas, etc."
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveBtn}>
              Guardar Cambios
            </button>
            <Link href="/paciente" className={styles.cancelBtn}>
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
