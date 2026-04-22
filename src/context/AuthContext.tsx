"use client"; // Es manejo de estado, debe ser del lado del cliente

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Definimos cómo se ve un "Usuario" en nuestro frontend
interface User {
  nombre: string;
  rol: "paciente" | "admin";
}

// 2. Definimos qué funciones tendrá nuestro cerebro (Contexto)
interface AuthContextType {
  user: User | null; // null significa que no ha iniciado sesión
  login: (nombre: string, rol: "paciente" | "admin") => void;
  logout: () => void;
}

// 3. Creamos el Contexto vacío
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Creamos el "Proveedor" (El que va a envolver a toda la aplicación para darle esta memoria)
export function AuthProvider({ children }: { children: ReactNode }) {
  // Por defecto, nadie ha iniciado sesión (null)
  const [user, setUser] = useState<User | null>(null);

  const login = (nombre: string, rol: "paciente" | "admin") => {
    setUser({ nombre, rol });
  };

  const logout = () => {
    setUser(null);
    // En el futuro, aquí borraremos el Token del localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Creamos un Hook personalizado para usar esto fácilmente en cualquier pantalla
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};