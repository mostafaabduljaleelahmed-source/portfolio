import React, { useState, useEffect, useMemo } from 'react';
import { useUI } from '../../context/UIContext';
import { SITE_CONFIG } from '../../config/siteConfig';

interface Command {
  id: string;
  label: string;
  tag: string;
  keywords: string;
}

const COMMANDS: Command[] = [
  { id: 'work', label: 'Jump to the work', tag: 'Go', keywords: 'work projects case studies' },
  { id: 'approach', label: 'How I work', tag: 'Go', keywords: 'approach philosophy about' },
  { id: 'contact', label: 'Contact details', tag: 'Go', keywords: 'contact email hire reach whatsapp' },
  { id: 'cv', label: 'Open the CV', tag: 'File', keywords: 'cv resume pdf download' },
  { id: 'email', label: 'Write an email', tag: 'Action', keywords: 'email mail write contact' }
];

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, closeCommandPalette, toggleCommandPalette } = useUI();
  const [search, setSearch] = useState('');
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearch('');
      setCursor(0);
    }
  }, [isCommandPaletteOpen]);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(c => `${c.label} ${c.keywords}`.toLowerCase().includes(q));
  }, [search]);

  const run = (id: string) => {
    closeCommandPalette();
    switch (id) {
      case 'work':
      case 'approach':
      case 'contact':
        window.location.hash = `#${id}`;
        break;
      case 'cv':
        window.open(SITE_CONFIG.resumeUrl, '_blank', 'noopener');
        break;
      case 'email':
        window.location.href = `mailto:${SITE_CONFIG.email}`;
        break;
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }
      if (!isCommandPaletteOpen) return;
      if (e.key === 'Escape') closeCommandPalette();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor(c => Math.min(c + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor(c => Math.max(c - 1, 0));
      }
      if (e.key === 'Enter' && results[cursor]) {
        e.preventDefault();
        run(results[cursor].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="cmdk" onClick={closeCommandPalette} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="cmdk-box" onClick={e => e.stopPropagation()}>
        <input
          type="text"
          className="cmdk-input"
          value={search}
          onChange={e => { setSearch(e.target.value); setCursor(0); }}
          placeholder="Search…"
          autoFocus
          aria-label="Search commands"
        />
        <div className="cmdk-list">
          {results.length === 0 && <div className="cmdk-empty">Nothing matches “{search}”</div>}
          {results.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`cmdk-item ${i === cursor ? 'is-cursor' : ''}`}
              onMouseEnter={() => setCursor(i)}
              onClick={() => run(c.id)}
            >
              <span>{c.label}</span>
              <code>{c.tag}</code>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
