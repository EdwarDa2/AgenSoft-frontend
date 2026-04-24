# 🩺 AgenSoft - Frontend

Bienvenido al frontend de **AgenSoft**, el sistema inteligente para la gestión de citas médicas y control de agendas. Esta aplicación está construida con **Next.js** y proporciona una interfaz moderna, rápida y segura para pacientes y administradores.

## 🚀 Características Principales

### 👤 Para Pacientes
- **Registro y Login**: Creación de cuenta y autenticación segura.
- **Reserva de Citas**: Interfaz intuitiva para seleccionar fechas y horarios disponibles.
- **Gestión de Citas**: Visualización de historial de citas y opción para cancelar.
- **Perfil de Usuario**: Gestión de información personal.

### ⚙️ Para Administradores
- **Panel de Control**: Resumen de citas del día y pendientes.
- **Gestión de Citas**: Aceptar, rechazar o recorrer citas existentes.
- **Configuración de Horarios**: Control total sobre los bloques de tiempo disponibles.
- **Seguridad**: Rutas protegidas y acceso restringido según el rol.

### 💎 UX/UI Mejorada
- **Notificaciones**: Sistema de alertas con `react-hot-toast`.
- **Estados de Carga**: Skeletons para una experiencia de carga fluida.
- **Modales Personalizados**: Diálogos de confirmación para acciones críticas.
- **Diseño Responsivo**: Adaptable a dispositivos móviles y escritorio.

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules
- **Cliente API**: Axios
- **Notificaciones**: React Hot Toast

## 🌐 Despliegue

- **Frontend (Render):** [https://agensoft-frontend.onrender.com]

## 📦 Instalación y Configuración

Sigue estos pasos para configurar el proyecto localmente:

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto (puedes guiarte de `.env.example`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**:
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Construcción para Producción

Para generar una versión optimizada para producción:

```bash
npm run build
npm start
```

## 📜 Estándares del Proyecto

- **Commits**: Se utiliza el estándar de *Conventional Commits*.
- **Ramas**: Se trabaja con *Feature Branches* integradas a `develop`.
