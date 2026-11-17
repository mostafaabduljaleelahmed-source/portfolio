import React, { useState, useEffect, useMemo } from 'react';
import { useUI } from '../../context/UIContext';
import { useAudio } from '../../context/AudioContext';
import { easterEggService } from '../../services/easterEggService';

interface Command {
  id: string;
  label: string;
  tag: string;
  keywords: string;
}

const COMMANDS: Command[] = [
  { id: 'projects', label: 'Jump to projects', tag: 'Navigate', keywords: 'projects work case studies' },
  { id: 'contact', label: 'Jump to contact', tag: 'Navigate', keywords: 'contact email hire reach' },
  { id: 'ai', label: 'Ask the site assistant', tag: 'Assistant', keywords: 'ai chat ask assistant question' },
  { id: 'achievements', label: 'View unlocked achievements', tag: 'Easter egg', keywords: 'achievements trophy secret' },
  { id: 'night-mode', label: 'Toggle midnight stealth mode', tag: 'Theme', keywords: 'night dark stealth theme' },
  { id: 'hero-lighting', label: 'Cycle the 3D lighting theme', tag: 'Scene', keywords: 'lighting 3d scene hero volumetric' },
  { id: 'matrix', label: 'Toggle matrix digital rain', tag: 'Easter egg', keywords: 'matrix rain green' }
];

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    closeCommandPalette,
    toggleCommandPalette,
    showToast,
    toggleAIChat,
    openAchievements,
    setMatrixMode
  } = useUI();
  const { playClick, playCrystal, playTheme } = useAudio();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearch('');
      easterEggService.unlockAchievement('cmd_k');
    }
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        closeCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, closeCommandPalette, toggleCommandPalette]);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(c => `${c.label} ${c.keywords}`.toLowerCase().includes(q));
  }, [search]);

  const handleCommandSelect = (cmd: string) => {
    closeCommandPalette();
    playClick();
    switch (cmd) {
      case 'projects':
        window.location.hash = '#work';
        break;
      case 'contact':
        window.location.hash = '#contact';
        break;
      case 'ai':
        toggleAIChat();
        break;
      case 'achievements':
        openAchievements();
        break;
      case 'night-mode':
        easterEggService.toggleNightMode();
        break;
      case 'hero-lighting':
        playTheme();
        window.dispatchEvent(new CustomEvent('discover-architect'));
        showToast('LIGHTING CYCLED', 'Scene lighting theme updated.');
        break;
      case 'matrix':
        setMatrixMode(prev => !prev);
        easterEggService.unlockAchievement('matrix');
        playCrystal();
        showToast('MATRIX MODE', 'Digital rain toggled.');
        break;
      default:
        break;
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      className="active"
      id="cmdk-modal"
      onClick={closeCommandPalette}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="cmdk-box" onClick={e => e.stopPropagation()}>
        <input
          type="text"
          className="cmdk-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search commands…"
          autoFocus
          aria-label="Command search input"
        />
        <div className="cmdk-list">
          {results.length === 0 && (
            <div className="cmdk-item" aria-live="polite">
              <span>No command matches “{search}”</span>
            </div>
          )}
          {results.map(cmd => (
            <div key={cmd.id} className="cmdk-item" onClick={() => handleCommandSelect(cmd.id)}>
              <span>&gt; {cmd.label}</span>
              <code>{cmd.tag}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
