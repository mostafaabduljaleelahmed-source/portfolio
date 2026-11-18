import React, { Suspense, lazy } from 'react';
import { UIProvider } from './context/UIContext';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { About } from './components/About/About';
import { Experiments } from './components/Experiments/Experiments';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Toast } from './components/Toast/Toast';

const CommandPalette = lazy(() =>
  import('./components/CommandPalette/CommandPalette').then(m => ({ default: m.CommandPalette }))
);

export const App: React.FC = () => (
  <UIProvider>
    <a href="#main-content" className="skip-to-content">Skip to main content</a>
    <div className="grain" aria-hidden="true" />

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
    </Suspense>
    <Toast />
  </UIProvider>
);
