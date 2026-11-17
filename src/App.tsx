import React, { useEffect, Suspense, lazy } from 'react';
import { UIProvider } from './context/UIContext';
import { AudioProvider } from './context/AudioContext';
import { WorldCanvas } from './three/WorldCanvas';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Projects } from './components/Projects/Projects';
import { Experiments } from './components/Experiments/Experiments';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Toast } from './components/Toast/Toast';
import { Loader } from './components/Loader/Loader';
import { initCustomCursor } from './utils/cursor';

// Lazy-loaded interactive widgets, kept off the critical parse path
const CommandPalette = lazy(() =>
  import('./components/CommandPalette/CommandPalette').then(m => ({ default: m.CommandPalette }))
);
const AIChat = lazy(() =>
  import('./components/AIChat/AIChat').then(m => ({ default: m.AIChat }))
);

const PortfolioAppContent: React.FC = () => {
  useEffect(() => initCustomCursor(), []);

  return (
    <>
      {/* CUSTOM CURSOR TARGETS */}
      <div id="custom-cursor" aria-hidden="true"></div>
      <div id="cursor-dot" aria-hidden="true"></div>

      {/* 3D HERO BACKDROP & GRAIN */}
      <WorldCanvas />
      <div className="grain" aria-hidden="true"></div>

      <Loader />

      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Experiments />
        <Contact />
      </main>

      <Footer />

      <Suspense fallback={null}>
        <CommandPalette />
        <AIChat />
      </Suspense>
      <Toast />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <UIProvider>
      <AudioProvider>
        <PortfolioAppContent />
      </AudioProvider>
    </UIProvider>
  );
};
