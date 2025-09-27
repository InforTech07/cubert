'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, LogOut, FolderOpen, ChevronRight } from 'lucide-react';
import { useSimpleTopBarSection } from '../ui/motion-primitives/simple-topbar';

// Hook simple para fecha y hora
export function useSimpleDateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateTimeComponent = (
    <div className="flex items-center gap-3">
      <Calendar className="w-4 h-4 futuristic-text-secondary" />
      <span className="text-sm futuristic-text">
        {currentTime.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
        })}
      </span>
      <Clock className="w-4 h-4 futuristic-text-secondary" />
      <span className="text-sm futuristic-text font-mono">
        {currentTime.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  );

  useSimpleTopBarSection('simple-datetime', dateTimeComponent, 'center', 1);
}

// Hook simple para logout
export function useSimpleLogout(onLogout?: () => void) {
  const logoutComponent = (
    <button
      onClick={onLogout || (() => alert('Logout!'))}
      className="flex items-center gap-2 px-3 py-2 rounded-lg futuristic-text transition-colors duration-200 hover:bg-red-500/20 hover:text-red-300"
    >
      <LogOut className="w-4 h-4 futuristic-text-secondary" />
      <span className="text-sm">Logout</span>
    </button>
  );

  useSimpleTopBarSection('simple-logout', logoutComponent, 'right', 1);
}

// Hook simple para breadcrumb
export function useSimpleBreadcrumb(items: Array<{ label: string; path: string }>) {
  const displayItems = items.slice(-3); // Mostrar máximo 3 elementos

  const breadcrumbComponent = (
    <div className="flex items-center gap-1">
      <FolderOpen className="w-4 h-4 futuristic-text-secondary" />
      <div className="flex items-center gap-1 ml-2">
        {displayItems.map((item, index) => (
          <div key={`${item.path}-${index}`} className="flex items-center gap-1">
            <button
              onClick={() => console.log('Navigate to:', item.path)}
              className="px-2 py-1 text-sm hover:bg-white/10 rounded futuristic-text-secondary transition-colors"
            >
              {item.label}
            </button>
            {index < displayItems.length - 1 && (
              <ChevronRight className="w-3 h-3 futuristic-text-muted" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  useSimpleTopBarSection('simple-breadcrumb', breadcrumbComponent, 'left', 1);
}