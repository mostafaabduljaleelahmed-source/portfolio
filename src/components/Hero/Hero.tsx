import React from 'react';
import { TerminalCLI } from './TerminalCLI';
import { SITE_CONFIG } from '../../config/siteConfig';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="hero-playground" id="hero-section" aria-label="Candidate Overview & Hero Section">
      <div className="hero-main-layout">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="pulse-dot"></span>
            Available for internships & junior roles
          </div>
          
          <h1 className="hero-title">
            Websites, apps, and the <em className="hero-accent-text">automation that runs them.</em>
          </h1>
          
          <p className="hero-subtitle">
            I’m <strong>Mostafa Abduljaleel</strong>, an Information Technology student at Cairo
            University. I build <strong>web and mobile apps</strong> — a shop’s daily inventory
            app, a live queue for a barbershop — and I <strong>automate</strong> the work around
            them, from publishing tools to bots that read my class group chats so I don’t have to.
          </p>

          <div className="hero-cta-group">
            <a href="#work" className="hero-btn primary">
              See my work <ArrowDown size={16} />
            </a>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hero-btn secondary"
            >
              <Mail size={16} /> Email me
            </a>
          </div>

          {/* QUICK LINKS */}
          <div className="hero-quick-links">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-link"
            >
              <Github size={18} /> GitHub Profile
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-link"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>

          <div className="hero-terminal-wrapper">
            <TerminalCLI />
          </div>
        </div>
      </div>
    </section>
  );
};



