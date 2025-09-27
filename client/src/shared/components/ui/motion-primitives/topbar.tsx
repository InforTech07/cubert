'use client';

import {
  motion,
  AnimatePresence,
  type SpringOptions,
} from 'motion/react';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { cn } from './utils/utils';

const DEFAULT_SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

// Types
export type TopBarSection = {
  id: string;
  component: React.ReactNode;
  position: 'left' | 'center' | 'right';
  priority: number; // 1 = highest priority, 5 = lowest
};

export type TopBarProps = {
  className?: string;
  height?: number;
  spring?: SpringOptions;
  maxSections?: number;
};

export type TopBarContextType = {
  sections: TopBarSection[];
  addSection: (section: TopBarSection) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updates: Partial<TopBarSection>) => void;
  maxSections: number;
};

export type TopBarProviderProps = {
  children: React.ReactNode;
  maxSections?: number;
};

// Context
const TopBarContext = createContext<TopBarContextType | undefined>(undefined);

// Provider
export function TopBarProvider({ 
  children, 
  maxSections = 5 
}: TopBarProviderProps) {
  const [sections, setSections] = useState<TopBarSection[]>([]);

  const addSection = useCallback((section: TopBarSection) => {
    setSections((prev) => {
      const filtered = prev.filter(s => s.id !== section.id);
      const updated = [...filtered, section]
        .sort((a, b) => a.priority - b.priority)
        .slice(0, maxSections);
      return updated;
    });
  }, [maxSections]);

  const removeSection = useCallback((id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateSection = useCallback((id: string, updates: Partial<TopBarSection>) => {
    setSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, ...updates } : section
      )
    );
  }, []);

  const value: TopBarContextType = useMemo(() => ({
    sections,
    addSection,
    removeSection,
    updateSection,
    maxSections,
  }), [sections, addSection, removeSection, updateSection, maxSections]);

  return (
    <TopBarContext.Provider value={value}>
      {children}
    </TopBarContext.Provider>
  );
}

// Hook
export function useTopBar() {
  const context = useContext(TopBarContext);
  if (!context) {
    throw new Error('useTopBar must be used within a TopBarProvider');
  }
  return context;
}

// Main TopBar Component
export function TopBar({
  className,
  height = 60,
  spring = DEFAULT_SPRING,
}: TopBarProps) {
  const { sections } = useTopBar();

  // Organize sections by position
  const leftSections = sections.filter(s => s.position === 'left');
  const centerSections = sections.filter(s => s.position === 'center');
  const rightSections = sections.filter(s => s.position === 'right');

  if (sections.length === 0) return null;

  return (
    <motion.div
      initial={{ y: -height, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -height, opacity: 0 }}
      transition={spring}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-3',
        className
      )}
    >
      <div
        className="mx-auto flex items-center justify-between w-full max-w-screen-2xl rounded-2xl px-6 py-3"
        style={{
          height: height,
          background: 'var(--futuristic-glass)',
          border: '1px solid var(--futuristic-glass-border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <AnimatePresence mode="popLayout">
            {leftSections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={spring}
                className="flex items-center"
              >
                {section.component}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="popLayout">
            {centerSections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={spring}
                className="flex items-center"
              >
                {section.component}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <AnimatePresence mode="popLayout">
            {rightSections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={spring}
                className="flex items-center"
              >
                {section.component}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Utility Components
export type TopBarItemProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function TopBarItem({ 
  children, 
  className, 
  onClick 
}: TopBarItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center px-3 py-2 rounded-lg',
        'futuristic-text transition-all duration-200',
        'hover:bg-white/5 active:bg-white/10',
        'focus:outline-none focus:ring-2 focus:ring-white/20',
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export type TopBarSeparatorProps = {
  className?: string;
};

export function TopBarSeparator({ className }: TopBarSeparatorProps) {
  return (
    <div
      className={cn(
        'w-px h-6 opacity-30',
        className
      )}
      style={{ background: 'var(--futuristic-border)' }}
    />
  );
}