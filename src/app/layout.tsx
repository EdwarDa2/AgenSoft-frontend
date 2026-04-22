import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";

export const metadata: Metadata = {
  title: "AgenSoft | Citas Médicas",
  description: "Sistema de gestión de agendas y citas médicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main style={{ padding: '2rem', minHeight: '80vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}