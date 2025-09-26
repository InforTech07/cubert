# Sistema de Enrutamiento Cubert

## Descripción
Sistema de enrutamiento personalizado con soporte para múltiples layouts, rutas anidadas y navegación programática.

## Características

### ✨ **Múltiples Layouts**
- **`main`**: Layout completo con dock (para páginas principales)
- **`auth`**: Layout sin dock (para login/registro)
- **`simple`**: Layout minimalista (para configuraciones)

### 🔗 **Rutas Dinámicas**
- Soporte para parámetros: `/files/:id`
- Rutas anidadas con diferentes layouts
- Navegación programática
- Historial del navegador

### 🎯 **Hooks Disponibles**
- `useRouter()`: Acceso completo al router
- `useNavigate()`: Función de navegación
- `useParams()`: Parámetros de la ruta actual

## Configuración de Rutas

### Estructura Básica
```tsx
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    layout: 'main',
    exact: true,
    title: 'Cubert - Dashboard'
  },
  {
    path: '/login',
    component: LoginPage,
    layout: 'auth', // Sin dock
    exact: true,
    title: 'Cubert - Iniciar Sesión'
  }
];
```

### Rutas con Parámetros
```tsx
{
  path: '/files/:id',
  component: FileDetailPage,
  layout: 'main',
  title: 'Cubert - Detalle de Archivo'
}
```

### Rutas Anidadas
```tsx
{
  path: '/dashboard',
  component: DashboardPage,
  layout: 'main',
  children: [
    {
      path: '/dashboard/settings',
      component: SettingsPage,
      layout: 'simple', // Layout diferente para hijo
      title: 'Cubert - Configuración'
    }
  ]
}
```

## Uso de Hooks

### useNavigate
```tsx
import { useNavigate } from './app/router';

const MyComponent = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/files/123');
  };
  
  return <button onClick={handleClick}>Ver archivo</button>;
};
```

### useParams
```tsx
import { useParams } from './app/router';

const FileDetail = () => {
  const { id } = useParams();
  
  return <div>Archivo ID: {id}</div>;
};
```

### useRouter
```tsx
import { useRouter } from './app/router';

const MyComponent = () => {
  const { currentPath, navigate, params } = useRouter();
  
  return (
    <div>
      <p>Ruta actual: {currentPath}</p>
      <p>Parámetros: {JSON.stringify(params)}</p>
    </div>
  );
};
```

## Componente Link

```tsx
import { Link } from './app/router';

const Navigation = () => {
  return (
    <div>
      <Link 
        to="/files" 
        className="futuristic-text hover:text-white"
      >
        Ver Archivos
      </Link>
    </div>
  );
};
```

## Layouts Disponibles

### Main Layout
- Fondo futurista completo
- Dock de navegación habilitado
- Para páginas principales de la aplicación

### Auth Layout
- Fondo futurista completo
- Sin dock (pantalla limpia)
- Para login, registro, recuperación de contraseña

### Simple Layout
- Fondo futurista minimalista
- Sin dock, menos efectos visuales
- Para configuraciones, formularios simples

## Integración en App.tsx

```tsx
import Router from './app/router/Router';
import { routes } from './app/router/routes';

const App = () => {
  return <Router routes={routes} />;
};
```

## Ejemplos de Rutas

```tsx
// Página principal con dock
'/' → HomePage (layout: main)

// Login sin dock
'/login' → LoginPage (layout: auth)

// Archivos con dock
'/files' → FilesPage (layout: main)

// Detalle con parámetros
'/files/123' → FileDetailPage (layout: main, params: {id: '123'})

// Configuración minimalista
'/dashboard/settings' → SettingsPage (layout: simple)
```

## Ventajas

- ✅ **Flexibilidad**: Múltiples layouts según contexto
- ✅ **Performance**: Renderizado condicional de layouts
- ✅ **Mantenibilidad**: Configuración centralizada
- ✅ **Experiencia**: Transiciones suaves entre páginas
- ✅ **Escalabilidad**: Fácil agregar nuevas rutas y layouts