import HorarioSelector from "../../../components/citas/HorarioSelector";
import Link from "next/link";

export default function AgendarCitaPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link 
          href="/paciente" 
          style={{ 
            color: '#1e88e5', 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '1rem',
            fontWeight: '500'
          }}
        >
          ← Volver a mis citas
        </Link>
        <h1 style={{ color: '#1e88e5' }}>Agendar Nueva Cita 📅</h1>
        <p style={{ color: '#666' }}>Sigue los pasos para reservar tu horario.</p>
      </header>

      <HorarioSelector />
    </div>
  );
}
