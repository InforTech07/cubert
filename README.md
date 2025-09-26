# Cubert - Sistema de Archivos Futurista

Sistema de gestión de archivos con interfaz futurista inspirada en la película "Passengers", implementado con arquitectura hexagonal.

## 🏗️ Estructura del Proyecto

```
cubert/
├── backend/                    # API Backend (Go)
│   ├── api/                   # Rutas y documentación API
│   ├── cmd/                   # Punto de entrada de la aplicación
│   └── internal/              # Lógica de negocio interna
├── client/                    # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── app/              # Configuración de la aplicación
│   │   ├── shared/           # Componentes y utilidades compartidas
│   │   ├── modules/          # Módulos con arquitectura hexagonal
│   │   └── assets/           # Recursos estáticos
│   └── components/           # Componentes de UI primitivos
└── .devcontainer/            # Configuración del contenedor de desarrollo
```

## ✨ Características

### 🎨 **Diseño Futurista**
- Interfaz inspirada en "Passengers"
- Efectos de cristal y transparencias elegantes
- Bordes resaltados sin neón excesivo
- Animaciones suaves y sofisticadas

### 🏛️ **Arquitectura Hexagonal**
- Separación clara de capas (Domain, Infrastructure, Presentation)
- Inversión de dependencias
- Fácilmente testeable y mantenible
- Módulos independientes y cohesivos

### 🔗 **Sistema de Enrutamiento**
- Múltiples layouts (main, auth, simple)
- Rutas dinámicas con parámetros
- Rutas anidadas
- Navegación programática

## 🚀 Desarrollo

### Prerrequisitos
- Node.js (v18+)
- Go (v1.21+)
- PNPM

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd cubert

# Instalar dependencias del frontend
cd client
pnpm install

# Instalar dependencias del backend
cd ../backend
go mod download
```

### Desarrollo Local

#### Frontend
```bash
cd client
pnpm dev
```

#### Backend
```bash
cd backend
go run cmd/server/main.go
```

## 📁 Módulos del Frontend

### 🔐 **Auth**
- Gestión de autenticación
- Login/logout con interfaz futurista
- Layout sin dock para mejor UX

### 📂 **File Management**
- Explorador de archivos
- Subida y descarga de archivos
- Búsqueda avanzada
- Vista de detalles con parámetros dinámicos

### 📊 **Dashboard**
- Panel principal con estadísticas
- Cards con información del sistema
- Navegación rápida a módulos

### 📤 **Sharing**
- Compartir archivos
- Gestión de permisos
- Enlaces de acceso

## 🎯 Tecnologías

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS 4** para estilos
- **Framer Motion** para animaciones
- **Lucide React** para iconos
- Enrutador personalizado

### Backend
- **Go** con Gin framework
- **Clean Architecture**
- **Swagger** para documentación API
- Manejo de archivos y metadatos

## 🎨 Sistema de Diseño

### Layouts Disponibles
- **Main**: Layout completo con dock para navegación
- **Auth**: Layout limpio sin dock para autenticación
- **Simple**: Layout minimalista para configuraciones

### Clases CSS Futuristas
```css
.futuristic-glass        /* Efecto de cristal */
.futuristic-surface      /* Superficies principales */
.futuristic-highlight    /* Bordes resaltados */
.futuristic-text         /* Texto principal */
.futuristic-text-secondary /* Texto secundario */
.futuristic-text-muted   /* Texto atenuado */
```

## 📝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🎬 Inspiración

Diseño inspirado en las interfaces limpias y elegantes de la película "Passengers" (2016), priorizando la funcionalidad y la estética futurista sin elementos excesivamente llamativos.