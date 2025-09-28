# Sistema de Transiciones de Rutas

Este sistema proporciona transiciones elegantes y suaves entre rutas en la aplicación Cubert, integrándose perfectamente con el diseño futurista existente.

## Características

- ✨ **5 tipos de transición**: fade, slide, scale, blur, matrix
- 🎮 **Configuración flexible**: duración, dirección, stagger
- 🎯 **Optimizado**: GPU-accelerated con Motion
- 🎨 **Estilo coherente**: Integrado con el tema futurista
- 📱 **Responsive**: Funciona en todos los dispositivos

## Tipos de Transición

### 1. Matrix (Recomendada)
```tsx
{ type: 'matrix', duration: 0.4, direction: 'up' }
```
- Efecto 3D sutil con rotación y desplazamiento
- Incluye efectos de brillo y desenfoque
- Ideal para la estética futurista

### 2. Blur
```tsx
{ type: 'blur', duration: 0.6, direction: 'up' }
```
- Transición con desenfoque suave
- Escalado sutil (0.98 → 1 → 1.02)
- Perfecta para cambios de contenido importantes

### 3. Slide
```tsx
{ type: 'slide', duration: 0.5, direction: 'right' }
```
- Deslizamiento direccional
- Direcciones: 'up', 'down', 'left', 'right'
- Ideal para navegación secuencial

### 4. Scale
```tsx
{ type: 'scale', duration: 0.3, direction: 'up' }
```
- Escalado con desenfoque
- Transición rápida y elegante
- Buena para modales y overlays

### 5. Fade
```tsx
{ type: 'fade', duration: 0.4 }
```
- Transición de opacidad simple
- La más rápida y sutil
- Universal para cualquier contenido

## Uso Básico

### Configuración Global
```tsx
import Router from './app/router/Router';
import routes from './app/router/routes';

function App() {
  return (
    <Router 
      routes={routes} 
      defaultTransition={{ type: 'matrix', duration: 0.4, direction: 'up' }}
    />
  );
}
```

### Hook useRouteTransition
```tsx
import { useRouteTransition } from '../router/Router';

function MyComponent() {
  const { setTransition, resetTransition, currentTransition } = useRouteTransition();

  // Cambiar transición para esta página
  useEffect(() => {
    setTransition({ type: 'blur', duration: 0.6 });
    return () => resetTransition(); // Limpiar al salir
  }, []);
}
```

## Componentes de Animación

### StaggerChild
Para elementos que aparecen secuencialmente:
```tsx
import { StaggerChild } from '../router/RouteTransition';

<div>
  <StaggerChild delay={0.1}>
    <h1>Aparece primero</h1>
  </StaggerChild>
  <StaggerChild delay={0.2}>
    <p>Aparece segundo</p>
  </StaggerChild>
</div>
```

### Transiciones con Stagger
```tsx
<RouteTransition 
  routeKey="unique-key" 
  transition={{ 
    type: 'matrix', 
    duration: 0.5, 
    stagger: true // Activa staggerChildren
  }}
>
  <MyComponent />
</RouteTransition>
```

## Ejemplos Avanzados

### Transición Condicional
```tsx
function ProductPage() {
  const { setTransition } = useRouteTransition();
  const { productType } = useParams();

  useEffect(() => {
    // Diferentes transiciones según el tipo de producto
    const transitionConfig = {
      'electronics': { type: 'matrix', duration: 0.6 },
      'books': { type: 'fade', duration: 0.3 },
      'clothing': { type: 'slide', direction: 'right' }
    }[productType] || { type: 'blur' };

    setTransition(transitionConfig);
  }, [productType]);
}
```

### Página con Elementos Animados
```tsx
function AnimatedDashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <StaggerChild delay={0.1}>
        <Header />
      </StaggerChild>
      
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <StaggerChild key={card.id} delay={0.1 * (index + 2)}>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="futuristic-surface rounded-xl p-6"
            >
              {card.content}
            </motion.div>
          </StaggerChild>
        ))}
      </div>
    </motion.div>
  );
}
```

## Clases CSS Útiles

### Optimización de Performance
```css
.transition-gpu-accelerated {
  transform: translateZ(0);
  will-change: transform, opacity, filter;
}

.transition-preserve-3d {
  transform-style: preserve-3d;
}
```

### Efectos Visuales
```css
.route-glow-border {
  animation: transition-glow 2s ease-in-out infinite;
}

.transition-glass-effect {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
}
```

## Mejores Prácticas

### 1. Performance
- Usa `transform` y `opacity` para animaciones
- Aplica `will-change` solo durante animaciones
- Evita animar `width`, `height`, `top`, `left`

### 2. UX
- Mantén duraciones entre 0.2s - 0.8s
- Usa easing curves naturales: `[0.22, 1, 0.36, 1]`
- Proporciona feedback visual inmediato

### 3. Accesibilidad
- Respeta `prefers-reduced-motion`
- Ofrece alternativas sin movimiento
- Mantén contraste suficiente durante transiciones

### 4. Consistencia
- Usa la transición 'matrix' como predeterminada
- Mantén duraciones similares en toda la app
- Aplica el mismo estilo de easing

## Configuración Recomendada por Módulo

```tsx
// Dashboard - Transición completa
{ type: 'matrix', duration: 0.4, stagger: true }

// Auth - Simple y rápida  
{ type: 'fade', duration: 0.3 }

// File Management - Direccional
{ type: 'slide', duration: 0.5, direction: 'right' }

// Settings - Escalado suave
{ type: 'scale', duration: 0.4 }

// Error pages - Con efecto
{ type: 'blur', duration: 0.6 }
```

## Personalización

### Crear Nueva Variante
```tsx
// En RouteTransition.tsx
const customVariant = {
  initial: { 
    opacity: 0, 
    rotateY: -90, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    rotateY: 0, 
    scale: 1 
  },
  exit: { 
    opacity: 0, 
    rotateY: 90, 
    scale: 0.8 
  }
};
```

### Transición Específica por Ruta
```tsx
// En routes.tsx
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    transition: { type: 'matrix', duration: 0.6, stagger: true }
  }
];
```

## Debugging

### Visualizar Transiciones
```tsx
// Agregar en RouteTransition.tsx
const debugMode = process.env.NODE_ENV === 'development';

if (debugMode) {
  console.log('Route transition:', { routeKey, transition });
}
```

### Performance Monitoring
```tsx
import { motion } from 'motion/react';

<motion.div
  onAnimationStart={() => console.time('route-transition')}
  onAnimationComplete={() => console.timeEnd('route-transition')}
>
```

¡El sistema de transiciones está listo! Integra perfectamente con el diseño futurista existente y proporciona una experiencia de usuario fluida y elegante.