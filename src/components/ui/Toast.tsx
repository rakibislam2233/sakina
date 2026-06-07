'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, X, Sparkles } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  toast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Automatically dismiss toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex items-start gap-3 p-4 rounded-lg shadow-xl backdrop-blur-lg border border-surface-parchment/10 text-sm ${
                t.type === 'success'
                  ? 'bg-emerald-950/80 text-emerald-100 border-emerald-500/20'
                  : t.type === 'error'
                  ? 'bg-rose-950/80 text-rose-100 border-rose-500/20'
                  : 'bg-surface-twilight/90 text-surface-parchment'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {t.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
                {t.type === 'info' && <Sparkles className="w-4 h-4 text-twilight-glow" />}
              </div>
              
              <div className="flex-1 text-xs font-sans tracking-wide leading-relaxed">
                {t.message}
              </div>
              
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 p-0.5 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white/80 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
