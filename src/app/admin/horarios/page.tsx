import ConfiguracionHorarios from "../../../components/admin/ConfiguracionHorarios";
import styles from "./page.module.css";
import Link from "next/link";

export default function HorariosAdminPage() {
  return (
    <div className={styles.pageContainer}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin" style={{ color: "#1e88e5", fontWeight: "bold" }}>
          ← Volver al Panel Principal
        </Link>
      </div>
      <ConfiguracionHorarios />
    </div>
  );
}