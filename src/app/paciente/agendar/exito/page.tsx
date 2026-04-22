"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const fecha = searchParams.get("fecha") || "No especificada";
  const hora = searchParams.get("hora") || "No especificada";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>
        <h1 className={styles.title}>¡Cita Agendada!</h1>
        <p className={styles.message}>
          Tu solicitud ha sido procesada correctamente. Hemos enviado un correo con los detalles de tu cita.
        </p>

        <div className={styles.details}>
          <p>📅 <strong>Fecha:</strong> {fecha}</p>
          <p>⏰ <strong>Hora:</strong> {hora}</p>
          <p>🩺 <strong>Especialista:</strong> Dr. Simi (Asignado por defecto)</p>
          <p>📍 <strong>Lugar:</strong> Consultorio Central AgenSoft</p>
        </div>

        <div className={styles.actions}>
          <Link href="/paciente" className={styles.primaryBtn}>
            Ir a mis citas
          </Link>
          <Link href="/" className={styles.secondaryBtn}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AgendarExitoPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
