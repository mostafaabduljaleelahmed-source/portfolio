import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { useUI } from '../../context/UIContext';
import { FileText, Menu, X } from 'lucide-react';

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'contact', label: 'Contact' }
];

export const Header: React.FC = () => {
  const { openCommandPalette } = useUI();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  // One observer for section highlighting beats a scroll handler doing
  // getBoundingClientRect on every frame.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <header className={`masthead ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="wordmark" href="#hero-section" aria-label="Back to top">
          Mostafa <b>Abduljaleel</b>
        </a>

        <nav className="masthead-nav" aria-label="Sections">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="masthead-actions">
          <a
            className="btn btn-small"
            href={SITE_CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={14} aria-hidden="true" /> CV
          </a>
          <button
            className="icon-btn desktop-only"
            onClick={openCommandPalette}
            title="Command palette (⌘K)"
            aria-label="Open command palette"
          >
            <span className="mono">⌘K</span>
          </button>
          <button
            className="icon-btn mobile-only"
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <nav>
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setIsMenuOpen(false)}>
                <span className="mono">0{i + 1}</span> {s.label}
              </a>
            ))}
          </nav>
          <div className="sheet-links">
            <a href={SITE_CONFIG.resumeUrl} target="_blank" rel="noopener noreferrer">CV</a>
            <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      )}
    </>
  );
};
