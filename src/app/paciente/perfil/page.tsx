"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from "../../../context/AuthContext";
import api from "@/api/axios";

export default function PerfilPacientePage() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    informacionMedica: ""
  });
  const [loading, setLoading] = useState(true);
  const [pacienteId, setPacienteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        // Intentar obtener el perfil por el ID de usuario
        const response = await api.get(`/pacientes/usuario/${user.id}`);
        if (response.data.success && response.data.data) {
          const p = response.data.data;
          setPacienteId(p.id);
          setFormData({
            nombre: p.nombre_completo || user.nombre || "",
            email: user.email || "",
            telefono: p.telefono || "",
            informacionMedica: p.informacion_medica || ""
          });
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        // Si no existe, al menos mostrar los datos del usuario
        setFormData(prev => ({
          ...prev,
          nombre: user?.nombre || "",
          email: user?.email || ""
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      setLoading(true);
      if (pacienteId) {
        // Actualizar perfil existente
        await api.patch(`/pacientes/${pacienteId}`, {
          nombre_completo: formData.nombre,
          telefono: formData.telefono,
          informacion_medica: formData.informacionMedica
        });
      } else {
        // Crear perfil si no existe (caso de usuario viejo sin perfil)
        const res = await api.post("/pacientes", {
          usuario_id: user.id,
          nombre_completo: formData.nombre,
          telefono: formData.telefono,
          informacion_medica: formData.informacionMedica
        });
        if (res.data.success) {
          setPacienteId(res.data.data.id);
        }
      }
      alert("¡Perfil actualizado con éxito!");
    } catch (error) {
      console.error(error);
      alert("Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
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
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
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
