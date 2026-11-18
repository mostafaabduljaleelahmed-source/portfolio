import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

export interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export interface UIContextType {
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  toast: ToastState;
  showToast: (title: string, msg: string) => void;
  hideToast: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<number | null>(null);

  const openCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);
  const toggleCommandPalette = useCallback(() => setIsCommandPaletteOpen(prev => !prev), []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  // Keeping the timer in a ref (not state) means showToast has a stable identity,
  // so consumers can list it in dependency arrays without re-running effects.
  const showToast = useCallback((title: string, msg: string) => {
    setToast({ title, msg, visible: true });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  }, []);

  return (
    <UIContext.Provider
      value={{
        isCommandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
        toggleCommandPalette,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
