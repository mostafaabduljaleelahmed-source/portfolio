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
  isAIChatOpen: boolean;
  openAIChat: () => void;
  closeAIChat: () => void;
  toggleAIChat: () => void;
  isAchievementsOpen: boolean;
  openAchievements: () => void;
  closeAchievements: () => void;
  toggleAchievements: () => void;
  toast: ToastState;
  showToast: (title: string, msg: string) => void;
  hideToast: () => void;
  matrixMode: boolean;
  setMatrixMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [matrixMode, setMatrixMode] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<number | null>(null);

  const openCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);
  const toggleCommandPalette = useCallback(() => setIsCommandPaletteOpen(prev => !prev), []);

  const openAIChat = useCallback(() => setIsAIChatOpen(true), []);
  const closeAIChat = useCallback(() => setIsAIChatOpen(false), []);
  const toggleAIChat = useCallback(() => setIsAIChatOpen(prev => !prev), []);

  const openAchievements = useCallback(() => setIsAchievementsOpen(true), []);
  const closeAchievements = useCallback(() => setIsAchievementsOpen(false), []);
  const toggleAchievements = useCallback(() => setIsAchievementsOpen(prev => !prev), []);

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
        isAIChatOpen,
        openAIChat,
        closeAIChat,
        toggleAIChat,
        isAchievementsOpen,
        openAchievements,
        closeAchievements,
        toggleAchievements,
        toast,
        showToast,
        hideToast,
        matrixMode,
        setMatrixMode,
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
